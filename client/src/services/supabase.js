import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://mxskxhuxbhitrrsoehfr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14c2t4aHV4YmhpdHJyc29laGZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ3MTU4MjAsImV4cCI6MjA1MDI5MTgyMH0.nScIn8DpwMO0erKw0ikUrGKkRRvHmPmZZtrMgCtNNG8'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;