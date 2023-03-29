export async function getServerSideProps() {
  const res = await fetch(`${process.env.API_URL}/api/auth/local`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      identifier: 'test@test.com',
      password: 'test12345',
    }),
  });

  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { users: data }, // will be passed to the page component as props
  };
}

const Home = ({ users }) => {
  console.log(users);

  return <>asdasda</>;
};

export default Home;
