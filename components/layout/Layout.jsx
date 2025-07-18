import Header from './Header';
import Footer from './Footer';
import NewsletterForm from 'components/NewsletterForm';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
      <NewsletterForm />
      <Footer />
    </>
  );
}
