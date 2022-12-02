import { getProviders, signIn as SignIntoProvider } from "next-auth/react";
import styles from '../../styles/Home.module.css'


function signIn({ providers }) {
  // console.log(providers)
  return (
    <main className={styles.main}>
      <h1 className={styles.title} style={{marginBottom: '40px'}}>
        Next-auth Oauth Sigin </h1>
      <div className={styles.grid}>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button className={'button button2'}
              onClick={() => SignIntoProvider(provider.id, { callbackUrl: '/dashboard' })}
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}

export default signIn;