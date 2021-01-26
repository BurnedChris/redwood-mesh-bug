
  const proxyquire = require("proxyquire")
  const fs = require('fs')
  const path = require('path')
  const files = {}
  const fileOverrides = {"file:///Users/christopherburns/GLaDOS/e/everfund/repos/rw-mesh-bug/web/src/Routes.js":"// In this file, all Page components from 'src/pages` are auto-imported. Nested\n// directories are supported, and should be uppercase. Each subdirectory will be\n// prepended onto the component name.\n//\n// Examples:\n//\n// 'src/pages/HomePage/HomePage.js'         -> HomePage\n// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage\n\nimport { Router, Route } from '@redwoodjs/router'\n\nconst Routes = () => {\n  return (\n    <Router>\n      <Route path=\"/\" page={ProfilePage} name=\"profile\" />\n      <Route notfound page={NotFoundPage} />\n    </Router>\n  )\n}\n\nexport default Routes\n","file:///Users/christopherburns/GLaDOS/e/everfund/repos/rw-mesh-bug/web/src/pages/ProfilePage/ProfilePage.test.js":"import { render } from '@redwoodjs/testing'\n\nimport ProfilePage from './ProfilePage'\n\ndescribe('ProfilePage', () => {\n  it('renders successfully', () => {\n    expect(() => {\n      render(<ProfilePage />)\n    }).not.toThrow()\n  })\n})\n","file:///Users/christopherburns/GLaDOS/e/everfund/repos/rw-mesh-bug/web/src/pages/ProfilePage/ProfilePage.js":"import { Link, routes } from '@redwoodjs/router'\n\nconst ProfilePage = () => {\n  return (\n    <>\n      <h1>ProfilePage</h1>\n      <p>\n        Find me in <code>./web/src/pages/ProfilePage/ProfilePage.js</code>\n      </p>\n      <p>\n        My default route is named <code>profile</code>, link to me with `\n        <Link to={routes.profile()}>Profile</Link>`\n      </p>\n    </>\n  )\n}\n\nexport default ProfilePage\n","file:///Users/christopherburns/GLaDOS/e/everfund/repos/rw-mesh-bug/package.json":"{\n  \"private\": true,\n  \"workspaces\": {\n    \"packages\": [\n      \"api\",\n      \"web\",\n      \"mesh\"\n    ]\n  },\n\n  \"scripts\": {\n    \"mesh\": \"cd ./mesh && yarn mesh serve\"\n  },\n  \"devDependencies\": {\n    \"@redwoodjs/core\": \"^0.23.0\"\n  },\n  \"eslintConfig\": {\n    \"extends\": \"@redwoodjs/eslint-config\"\n  },\n  \"engines\": {\n    \"node\": \">=12\",\n    \"yarn\": \">=1.15\"\n  }\n}\n","file:///Users/christopherburns/GLaDOS/e/everfund/repos/rw-mesh-bug/web/src/index.js":"import { AuthProvider } from '@redwoodjs/auth'\nimport { Magic } from 'magic-sdk'\nimport ReactDOM from 'react-dom'\nimport { RedwoodProvider, FatalErrorBoundary } from '@redwoodjs/web'\nimport FatalErrorPage from 'src/pages/FatalErrorPage'\n\nimport Routes from 'src/Routes'\n\nimport './index.css'\n\nconst m = new Magic(process.env.MAGICLINK_PUBLIC)\n\nReactDOM.render(\n  <FatalErrorBoundary page={FatalErrorPage}>\n    <AuthProvider client={m} type=\"magicLink\">\n      <RedwoodProvider>\n        <Routes />\n      </RedwoodProvider>\n    </AuthProvider>\n  </FatalErrorBoundary>,\n  document.getElementById('redwood-app')\n)\n","file:///Users/christopherburns/GLaDOS/e/everfund/repos/rw-mesh-bug/node_modules/.cache/%40babel/register/.babel.7.12.10.development.json":"{}"}
  const FILE_SCHEME = 'file://'

  function URL_file(f) {
    if (f.startsWith(FILE_SCHEME))
      f = f.substr(FILE_SCHEME.length)
    return new URL(FILE_SCHEME + path.normalize(f)).href
  }

  proxyquire('@redwoodjs/cli/dist', {
    fs: {
      mkdir() {},
      mkdirSync(...args) {},
      writeFile(a, b) {
        files[URL_file(a)] = b
      },
      writeFileSync(a, b) {
        files[URL_file(a)] = b
      },
      readFileSync(...args) {
        const f = URL_file(args[0])
        if (fileOverrides[f]) return fileOverrides[f]
        return fs.readFileSync.apply(fs, args)
      },
      '@global': true,
    },
  })

  process.on('exit', () => {
    console.log("---------===----===--------")
    console.log(JSON.stringify(files, null, 2))
  })
  