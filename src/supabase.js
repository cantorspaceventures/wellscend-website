
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = 'https://zgditsdthxtuzluzfiem.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpnZGl0c2R0aHh0dXpsdXpmaWVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3MDczNjIsImV4cCI6MjA4MzI4MzM2Mn0.H2ZTBvvBajTJ4XBScugDTz4NE3iFyspmgxuZTnpPLWI'
export const supabase = createClient(supabaseUrl, supabaseKey)
