interface ForumContentProps {
  content: string
}

export function ForumContent({ content }: ForumContentProps) {
  return (
    <div 
      className="prose dark:prose-invert prose-sm max-w-none 
      prose-a:text-primary hover:prose-a:text-cyan-500 
      prose-img:rounded-xl prose-img:shadow-md
      prose-headings:font-bold prose-headings:text-secondary dark:prose-headings:text-white"
      dangerouslySetInnerHTML={{ __html: content }} 
    />
  )
}
