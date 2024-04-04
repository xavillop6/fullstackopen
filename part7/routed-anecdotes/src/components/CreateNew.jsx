import { useState } from "react"
import { useField } from "../hooks"

const CreateNew = (props) => {
    const {reset: resetContent, ...content} = useField('text')
    const {reset: resetAuthor, ...author} = useField('text')
    const {reset: resetUrl, ...url} = useField('text')
  
  
    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content: content.value,
        author: author.value,
        info: url.value,
        votes: 0
      })
    }

    const handleReset = () => {
        resetContent()
        resetAuthor()
        resetUrl()
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input name="content" {...content} />
          </div>
          <div>
            author
            <input name="author"  {...author} />
          </div>
          <div>
            url for more info
            <input name="url" {...url} />
          </div>
                <button>create</button>
                <button type="button" onClick={handleReset}>reset</button>
        </form>
      </div>
    )
  
}
  
export default CreateNew