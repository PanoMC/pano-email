/**
 * Emits a raw Handlebars expression into the compiled template, e.g. `{{{content}}}` or
 * `{{#if footer}}`. React escapes only `& < > " '`, so braces and `#`/`/` survive rendering;
 * keep the expression free of those five characters.
 *
 * Usage: <Raw hbs="{{{content}}}" />
 */
export const Raw = ({ hbs }: { hbs: string }) => hbs as any;
