function Home({ username }) {
  
  return (
    <h1>
      {username && `Welcome to the butterfly garden ${username}!`}
      {!username && 'Welcome to the butterfly garden!'}
    </h1>
  )
}
export default Home;
