const modId = 'LegacyMapLink';

const Mod = {
  about: `Adds a link to the legacy map to the map page.`,
  routes: {
    // eslint-disable-next-line react/prop-types
    'Legacy-Map': function MenuItem({ React }) {
      window.location.href = '/legacymap/index.html';
      return (
        <div>
          Redirecting to legacy map...
          <a href="/legacymap">Click here if you are not redirected</a>
        </div>
      );
    },
  },
};

window[modId] = Mod;
window.dispatchEvent(new Event(`mod:${modId}:ready`));
