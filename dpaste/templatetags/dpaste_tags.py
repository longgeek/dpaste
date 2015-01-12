from django.template import Library

from ..highlight import pygmentize

from markdown import Markdown

register = Library()

@register.filter
def in_list(value, arg):
    return value in arg

@register.filter
def highlight(snippet):
    h = pygmentize(snippet.content, snippet.lexer)
    h = h.replace(u'  ', u'&nbsp;&nbsp;')
    h = h.replace(u'\t', '&nbsp;&nbsp;&nbsp;&nbsp;')
    return h.splitlines()

@register.filter
def convert_text(text):
    """ Definition template filters,
	    used to convert text to markdown style
	"""

    md = Markdown(extensions=['toc'])
    if not text:
        text = ''
    content = md.convert(text)
    return content
