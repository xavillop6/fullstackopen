const Hello = (props) => {
  return (
    <div>
      <p style={{ color: props.color }}>
        Hello {props.name}, you are {props.age} years old
      </p>
    </div>
  )
}
  export default Hello;