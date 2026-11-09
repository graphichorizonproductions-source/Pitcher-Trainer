# Worship Team Pitch Trainer

A game-style trainer that teaches worship singers music theory, ear training and singing from zero. English and Spanish.

- 14 levels in 4 sections: What Notes Mean, Steps and Scales, Rhythm/Keys/Steadiness, Your Voice
- Each level: lesson, 3 practices that get harder (with a "you beat it" popup), then a test with 3 versions (A/B/C)
- Test mixes questions, listening, rhythm tapping and live singing (pitch detected from the microphone)
- Recorded natural voice (Kokoro: am_puck for English, em_santa for Spanish) in `audio/`, with browser voice fallback

Host `index.html` and `audio/` together on any static host (HTTPS needed for the microphone).

`tools/` holds the source (`src/`), `build.py`, `pack.py` and `gen.py` (voice recording).
