import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer';

function Layout({
  children,
  search = false,
  pageTitle,
  pageIcon = '',
  footer = false,
}) {
  return (
    <>
      <Header
        search={ search }
        pageTitle={ pageTitle }
        pageIcon={ pageIcon }
      />
      <main>
        {children}
      </main>
      {footer && <Footer />}
    </>
  );
}

export default Layout;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  search: PropTypes.bool,
  pageTitle: PropTypes.string.isRequired,
  footer: PropTypes.bool,
  pageIcon: PropTypes.oneOf(['meal', 'drink', 'done', 'favorite', 'profile']),
};
