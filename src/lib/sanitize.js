import sanitizeHtml from 'sanitize-html';

// Notes are plain text, so strip all HTML tags and attributes before saving. This
// stops a stored note from injecting markup or a script when it is shown later
// (stored XSS). sanitize-html also escapes the text it keeps (&, < and > become
// &amp;, &lt; and &gt;), but Svelte escapes text again whenever it renders it, so
// they are turned back into characters here; otherwise "Tea & biscuits" would
// show as "Tea &amp; biscuits". &amp; goes last so "&amp;lt;" becomes "&lt;".
export default function clean(dirty) {
	return sanitizeHtml(dirty, {
		allowedTags: [],
		allowedAttributes: {}
	})
		.replaceAll('&lt;', '<')
		.replaceAll('&gt;', '>')
		.replaceAll('&amp;', '&');
}
