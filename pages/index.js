import {getCookie} from "cookies-next";
export default function Home({userToken}) {
  return (
    <>

    </>
  )
}

export const getServerSideProps = ({req, res}) => {
  let user = getCookie('token', {req, res}) || null;

  if (user) {
    return {
      redirect: {
        destination: '/@app',
        permanent: false,
      },
    }
  }

  return {
    props: {
      userToken: getCookie('token', {req, res}) || null,
    }
  };
};