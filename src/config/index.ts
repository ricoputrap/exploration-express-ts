import dotenv from 'dotenv'
dotenv.config();

const PORT = process.env.PORT;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

export {
  PORT,
  SUPABASE_URL,
  SUPABASE_KEY
}