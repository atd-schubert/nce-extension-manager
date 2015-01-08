# NCE extension-manager
## Description
An extension to install, activate, deactivate and uninstall nce extensions with their peerDependencies

## How to install
Install with npm: `npm install --save nce-extension-manager`

Integrate in NCE:

```
var NCE = require("nce");
var nce = new NCE(/*{}*/);
var ExtMgr = require("nce-extension-manager");
var extMgr = ExtMgr(nce);
extMgr.activateExtension(extMgr);
```

## How to use
nce-extension-manager will give you an easy way to install or activate extensions for nce with their nce-peerDependencies.
### Basic funcitons
The following examples handle the extension nce-i18n.
#### .getActivatedExtension(name)
Get an already activated extension by extension-name in nce (without "nce-"-prefix!).
```
var nce = new (require("nce"))();
var extMgr = require("nce-extension-manager")(nce);
extMgr.activateExtention(extMgr);
var i18n = extMgr.getActivatedExtension("nce-i18n");
```
#### .activateExtension(extension)
Get an already activated extension by an extension itself.
```
var nce = new (require("nce"))();
var extMgr = require("nce-extension-manager")(nce);
extMgr.activateExtention(extMgr);
var i18n = require("nce-i18n")(nce);
extMgr.activateExtension(i18n);
```

#### .installExtension(extension)
Get an minimum installed extension by an extension itself.
```
var nce = new (require("nce"))();
var extMgr = require("nce-extension-manager")(nce);
extMgr.activateExtention(extMgr);
var i18n = require("nce-i18n")(nce);
extMgr.installExtension(i18n);
```
#### .getInstalledExtension(name)
Get a minimum installed extension by extension-name in nce (without "nce-"-prefix!).
```
var nce = new (require("nce"))();
var extMgr = require("nce-extension-manager")(nce);
extMgr.activateExtention(extMgr);
var i18n = extMgr.getActivatedExtension("nce-i18n");
