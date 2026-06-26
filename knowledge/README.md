# Knowledge Base

This folder is reserved for documents that power the AI Assistant's
retrieval-augmented generation (RAG) pipeline.

## Supported sources

- `resume.md` — current resume in markdown
- `linkedin.md` — exported LinkedIn profile
- `projects/*.md` — per-project deep-dives
- `github/*.md` — repository READMEs

## How it's wired

The chat UI talks to `src/services/ai.ts`, which dispatches to the provider
selected by `VITE_CHAT_PROVIDER`. When a real provider is configured
(HuggingFace Space, FastAPI, or local), that backend is expected to index the
contents of this folder and serve grounded responses.

The frontend never needs to ship these files — they live with the model server.
