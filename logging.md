# Logging

A log line is often the only way to learn why something quietly did nothing in production, where there's no debugger and no way to reproduce it. Log so that a failure explains itself, without ever recording what the user typed, sent or owns.

## When to log

- **Log wherever the code quietly gives up.** If it hides a view, skips a feature, falls back to a default, retries, or returns early on an error, it writes one line saying which step failed and why. Typical places: network and system service calls, loading files or media, decoding input from a URL or another app, reading and writing storage, consent and third-party SDKs, scheduled and background jobs.
- **Don't log the happy path line by line.** Log a normal step only when it marks a stage worth following later, such as a job starting or a screen being chosen.
- **Never swallow an error to avoid logging it.** A caught failure is either shown to the user, returned as a typed error, or logged, and often both logged and one of the others.

## What a line says

- Say what happened, not what it held: the step, the outcome and the reason (`publish failed: platform returned 401`), plus stable identifiers that help find the case, such as a job id or an error code.
- Use the platform's structured logger and one category or prefix per feature, so a reader can filter to it.
- Pick the level by what the user loses: `error` when a feature didn't work, `warn` for a fallback or retry that hid a problem, `info` for a stage worth following, `debug` for detail only useful while developing.
- One line per event. Don't log the same failure at every layer it passes through; log it where it's caught.

## Never log

- User content or input: tool input and output, post text, messages, files, words, scores, answers, or anything that could reveal a hidden answer.
- Secrets and credentials: passwords, tokens, API keys, session ids, one-time codes, signed or tokenized URLs. Redact query strings that can carry them.
- Personal details: names, emails, IP addresses, or anything that identifies a person, unless the line can't be traced without an opaque id.
- Whole request or response bodies, or whole objects whose fields you haven't checked.

When in doubt, log the type, length or count instead of the value.

## Keep it testable and readable

- When the wording depends on a case, such as why a load failed, put it in a small pure function or type and unit test it, so the code with side effects just calls the logger.
- When a change adds logging for a failure that can't be reproduced locally, say in the PR description where the line shows up and how to filter to it.
