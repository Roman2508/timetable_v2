// third-party
import SyntaxHighlighter from 'react-syntax-highlighter'
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'

// ==============================|| CODE HIGHLIGHTER ||============================== //

const SyntaxHighlight: React.FC<React.PropsWithChildren<{ children: string | string[] }>> = ({
  children,
  ...others
}) => {
  return (
    <SyntaxHighlighter language="javacript" showLineNumbers style={a11yDark} {...others}>
      {children}
    </SyntaxHighlighter>
  )
}

export default SyntaxHighlight
