## Where the data lives

The meals live in a table called `meals` in my Supabase project. The
page reads and writes it with the publishable key, which is built to be
public: Row Level Security policies let anyone read, add, and remove a
meal, and nothing else. The project's URL and key are in `.env.local`
on my laptop and in Netlify's environment variables, never in this
repo.
