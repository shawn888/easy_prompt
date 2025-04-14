import { Prompt } from '../lib/api'

interface PromptProps {
  prompt: Prompt
  key?: string
}

export default function PromptCard(props: PromptProps): JSX.Element 