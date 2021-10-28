import "../styles/antd.css";
import AppLayout from '../component/Layout/layout';

function MyApp({ Component, pageProps }) {
  switch (Component.name) {
    case "Home":
      return <Component {...pageProps} />;
    case "Login":
      return <Component {...pageProps} />;
    case "Signup":
      return <Component {...pageProps} />;
    default:
      return (
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      );
  }
}

export default MyApp;
