import { createSignal, onMount, For, Show } from "solid-js"
import { supabase, OWNER_EMAIL } from "@lib/supabase"

type Comment = {
  id: string
  created_at: string
  page_key: string
  author_name: string
  body: string
  parent_id: string | null
  is_owner: boolean
}

type Props = { pageKey: string }

// Rate-limit (côté navigateur) : dissuasif, mais le vrai filet est la suppression admin.
const RL_KEY = "cmt_posts"
const MIN_GAP_MS = 30_000          // 30 s minimum entre deux messages
const MAX_IN_WINDOW = 5            // 5 messages...
const WINDOW_MS = 10 * 60_000      // ...par tranche de 10 minutes

function fmtDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })
    + " · " + d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
}

export default function Comments(props: Props) {
  const [comments, setComments] = createSignal<Comment[]>([])
  const [loading, setLoading] = createSignal(true)
  const [name, setName] = createSignal("")
  const [body, setBody] = createSignal("")
  const [honey, setHoney] = createSignal("")
  const [error, setError] = createSignal("")
  const [info, setInfo] = createSignal("")
  const [sending, setSending] = createSignal(false)
  const [isOwner, setIsOwner] = createSignal(false)
  const [replyTo, setReplyTo] = createSignal<string | null>(null)

  async function load() {
    if (!supabase) { setLoading(false); return }
    const { data } = await supabase
      .from("comments")
      .select("*")
      .eq("page_key", props.pageKey)
      .order("created_at", { ascending: true })
    setComments((data as Comment[]) ?? [])
    setLoading(false)
  }

  async function checkAuth() {
    if (!supabase) return
    const { data } = await supabase.auth.getSession()
    const email = data.session?.user?.email ?? ""
    setIsOwner(email.toLowerCase() === OWNER_EMAIL.toLowerCase())
  }

  onMount(() => {
    load()
    checkAuth()
    supabase?.auth.onAuthStateChange(() => checkAuth())
  })

  function recentPosts(): number[] {
    try {
      const arr: number[] = JSON.parse(localStorage.getItem(RL_KEY) ?? "[]")
      const now = Date.now()
      return arr.filter((t) => now - t < WINDOW_MS)
    } catch { return [] }
  }
  function rateLimitError(): string {
    const posts = recentPosts()
    const now = Date.now()
    if (posts.length) {
      const last = Math.max(...posts)
      if (now - last < MIN_GAP_MS) {
        return `Patiente ${Math.ceil((MIN_GAP_MS - (now - last)) / 1000)} s avant de reposter.`
      }
    }
    if (posts.length >= MAX_IN_WINDOW) {
      const oldest = Math.min(...posts)
      return `Tu as atteint ${MAX_IN_WINDOW} messages. Réessaie dans ~${Math.ceil((WINDOW_MS - (now - oldest)) / 60000)} min.`
    }
    return ""
  }
  function recordPost() {
    const posts = recentPosts()
    posts.push(Date.now())
    try { localStorage.setItem(RL_KEY, JSON.stringify(posts)) } catch {}
  }

  async function submit(parentId: string | null) {
    setError(""); setInfo("")
    if (!supabase) return
    if (honey()) return // bot : honeypot rempli → on ignore silencieusement
    const n = name().trim()
    const b = body().trim()
    if (!isOwner() && n.length < 1) { setError("Indique ton nom."); return }
    if (b.length < 1) { setError("Écris un message."); return }
    if (b.length > 2000) { setError("Message trop long (2000 caractères max)."); return }
    if (!isOwner()) {
      const rl = rateLimitError()
      if (rl) { setError(rl); return }
    }
    setSending(true)
    const { error } = await supabase.from("comments").insert({
      page_key: props.pageKey,
      author_name: isOwner() ? "Jilani" : n,
      body: b,
      parent_id: parentId,
      is_owner: isOwner(),
    })
    setSending(false)
    if (error) { setError("Erreur à l'envoi. Réessaie."); return }
    if (!isOwner()) recordPost()
    setBody("")
    setReplyTo(null)
    load()
  }

  async function remove(id: string) {
    if (!supabase || !isOwner()) return
    if (!confirm("Supprimer ce commentaire ?")) return
    await supabase.from("comments").delete().eq("id", id)
    load()
  }

  async function adminLogin() {
    if (!supabase) return
    const email = prompt("Email administrateur :")
    if (!email) return
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.href },
    })
    setInfo(error ? "" : "Lien de connexion envoyé par email. Clique dessus pour revenir connecté.")
    setError(error ? "Erreur d'envoi du lien." : "")
  }
  async function adminLogout() {
    await supabase?.auth.signOut()
    checkAuth()
  }

  const topLevel = () => comments().filter((c) => !c.parent_id)
  const repliesOf = (id: string) => comments().filter((c) => c.parent_id === id)

  const fieldCls =
    "w-full px-3 py-2 rounded outline-none text-black dark:text-white bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 focus:border-black focus:dark:border-white"

  function form(parentId: string | null) {
    return (
      <div class="space-y-2 mt-3">
        <Show when={!isOwner()}>
          <input class={fieldCls} type="text" placeholder="Ton nom" value={name()}
            maxlength={60} onInput={(e) => setName(e.currentTarget.value)} />
        </Show>
        <textarea class={fieldCls} rows={3} placeholder="Ton message…" value={body()}
          maxlength={2000} onInput={(e) => setBody(e.currentTarget.value)} />
        {/* honeypot anti-bot (caché) */}
        <input class="hidden" tabindex={-1} autocomplete="off" aria-hidden="true"
          value={honey()} onInput={(e) => setHoney(e.currentTarget.value)} />
        <div class="flex items-center gap-3">
          <button
            class="px-4 py-2 rounded text-sm bg-black dark:bg-white text-white dark:text-black hover:opacity-75 blend disabled:opacity-50"
            disabled={sending()} onClick={() => submit(parentId)}>
            {parentId ? "Répondre" : "Publier"}
          </button>
          <Show when={parentId}>
            <button class="text-sm opacity-75 hover:opacity-100" onClick={() => { setReplyTo(null); setBody("") }}>
              Annuler
            </button>
          </Show>
        </div>
      </div>
    )
  }

  function commentCard(c: Comment, isReply: boolean) {
    return (
      <div class={`p-4 rounded-lg border border-black/10 dark:border-white/15 ${isReply ? "ml-6 mt-2" : ""}`}>
        <div class="flex items-center gap-2 text-sm">
          <span class="font-semibold text-black dark:text-white">{c.author_name}</span>
          <Show when={c.is_owner}>
            <span class="text-xs px-1.5 py-0.5 rounded-full border border-black/20 dark:border-white/30">auteur</span>
          </Show>
          <span class="opacity-50">·</span>
          <span class="opacity-60 text-xs">{fmtDate(c.created_at)}</span>
        </div>
        <p class="mt-2 whitespace-pre-wrap break-words">{c.body}</p>
        <div class="mt-2 flex gap-4 text-xs">
          <Show when={!isReply}>
            <button class="opacity-70 hover:opacity-100 underline underline-offset-2"
              onClick={() => { setReplyTo(replyTo() === c.id ? null : c.id); setBody("") }}>
              Répondre
            </button>
          </Show>
          <Show when={isOwner()}>
            <button class="opacity-70 hover:opacity-100 underline underline-offset-2 text-red-500"
              onClick={() => remove(c.id)}>
              Supprimer
            </button>
          </Show>
        </div>
        <Show when={replyTo() === c.id}>
          {form(c.id)}
        </Show>
      </div>
    )
  }

  return (
    <section class="mt-16 pt-8 border-t border-black/10 dark:border-white/15">
      <div class="flex items-center justify-between">
        <h2 class="font-semibold text-black dark:text-white text-lg">Commentaires</h2>
        <Show
          when={isOwner()}
          fallback={<button class="text-xs opacity-40 hover:opacity-80" onClick={adminLogin}>Admin</button>}>
          <button class="text-xs opacity-60 hover:opacity-100" onClick={adminLogout}>Déconnexion admin</button>
        </Show>
      </div>

      <Show when={supabase} fallback={
        <p class="mt-4 text-sm opacity-60">Les commentaires seront bientôt disponibles.</p>
      }>
        <div class="mt-4 space-y-4">
          <Show when={!loading()} fallback={<p class="text-sm opacity-60">Chargement…</p>}>
            <Show when={topLevel().length > 0} fallback={
              <p class="text-sm opacity-60">Aucun commentaire pour l'instant. Sois le premier !</p>
            }>
              <For each={topLevel()}>
                {(c) => (
                  <div>
                    {commentCard(c, false)}
                    <For each={repliesOf(c.id)}>{(r) => commentCard(r, true)}</For>
                  </div>
                )}
              </For>
            </Show>
          </Show>

          {/* Formulaire nouveau commentaire (masqué pendant une réponse) */}
          <Show when={replyTo() === null}>
            <div class="pt-2">
              <p class="text-sm font-semibold text-black dark:text-white">Laisser un commentaire</p>
              {form(null)}
            </div>
          </Show>

          <Show when={error()}><p class="text-sm text-red-500">{error()}</p></Show>
          <Show when={info()}><p class="text-sm opacity-70">{info()}</p></Show>
        </div>
      </Show>
    </section>
  )
}
