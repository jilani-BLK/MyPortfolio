import { createClient, type SupabaseClient } from "@supabase/supabase-js"

// Variables publiques (injectées au build) — sûres côté navigateur.
// La sécurité réelle est assurée par les règles RLS de Supabase.
const url = import.meta.env.PUBLIC_SUPABASE_URL as string | undefined
const anonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string | undefined

// Email qui a les droits d'administration (réponses « auteur » + suppression).
// Doit correspondre à l'email utilisé pour se connecter, et à celui des règles RLS.
export const OWNER_EMAIL =
  (import.meta.env.PUBLIC_OWNER_EMAIL as string | undefined) ?? "jilani.belarbi@yahoo.com"

// null tant que les variables d'environnement ne sont pas configurées
export const supabase: SupabaseClient | null =
  url && anonKey ? createClient(url, anonKey) : null
