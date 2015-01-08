"use strict";

module.exports = function(nce){
  if(!nce) throw new Error("You have to specify the nce object");
  
//# Mandantory Setup:
  var ext = nce.createExtension({package: require("./package.json")});
  
  ext.on("install", function(event){ // set options, but don't run or make available in nce
    //# Seting extension-config:
    //* nce-winston
    ext.config.logger = ext.config.logger || {};
    ext.config.autoActivate = ext.config.autoInstall || [];
    
    //# Declarations and settings:
    //* nce-winston
    ext.logger = ext.getActivatedExtension("winston").createLogger(ext.name, ext.config.logger);
  });
  
  ext.on("uninstall", function(event){ // undo installation
    //# Undeclare:
    //* nce-winston
    nce.getExtension("winston").removeLogger(ext.name);
    delete ext.logger;
    
  });
  
  ext.on("activate", function(event){ // don't set options, just run, make available in nce or register.
    
  });
  
  ext.on("deactivate", function(event){ // undo activation
    
  });
  
//# Private declarations:
  /*var getDependents = function(name){
    return ["// TODO: ", "Return a list of extensions, that use this "];
  };*/

//# Public declarations and exports:
  ext.getExtension = function(name, opts){
    var extension = nce.getExtension(name);
    if(!extension) {
      try {
        extension = require("nce-"+name)(nce);
      } catch(e){
        throw new Error("Can not get an extension with the name: '"+ name + ". Maybe type 'npm install nce-" + name + "' first!");
      }
    }
    return extension;
  };
  ext.getInstalledExtension = function(name, opts){
    return ext.installExtension(ext.getExtension(name));
  };
  ext.getActivatedExtension = function(name, opts){
    return ext.activateExtension(ext.getExtension(name));
  };
  ext.installExtension = function(extension, opts) {
    var hash;
    if(!extension.status || extension.status === "uninstalled"){
      for(hash in extension.package.peerDependencies) {
        if(/^nce-/.test(hash)) ext.getInstalledExtension(hash.substr(4));
      }
      extension.install();
      if(ext.logger) ext.logger.info("Extension '" + extension.name + " installed...", {
        name: extension.name,
        package: extension.package,
        config: extension.config
      });
    }
    return extension;
  };
  ext.activateExtension = function(extension, opts) {
    var hash;
    if(extension.status !== "activated"){
      for(hash in extension.package.peerDependencies) {
        if(/^nce-/.test(hash)) ext.getActivatedExtension(hash.substr(4), opts);
      }
      if(!extension.status || extension.status === "uninstalled") {
        extension.install();
        if(ext.logger) ext.logger.info("Extension '" + extension.name + " installed before activation...", {
          name: extension.name,
          package: extension.package,
          config: extension.config
        });
      }
      extension.activate();
      if(ext.logger) ext.logger.info("Extension '" + extension.name + " activated...", {
        name: extension.name,
        package: extension.package,
        config: extension.config
      });
    }
    return extension;
  };
  /* Not stable!
  ext.deactivateExtension = function(extension, opts){ // TODO: Not correct!
    var hash;
    if(extension.status === "activated"){
      for(hash in extension.package.peerDependencies) {
        if(/^nce-/.test(hash) && getDependents(hash.substr(4)).length === 1) ext.deactivateExtension(ext.getExtension(hash.substr(4), opts), opts);
      }
      extension.deactivate();
    }
    return extension;
  };
  ext.uninstallExtension = function(extension, opts){ // TODO: Not correct!
    var hash;
    if(extension.status === "installed" || extension.status === "activated" || extension.status === "deactivated"){
      for(hash in extension.package.peerDependencies) {
        if(/^nce-/.test(hash) && getDependents(hash.substr(4)).length === 1) ext.uninstallExtension(ext.getExtension(hash.substr(4), opts), opts);
      }
      if(extension.status === "activated") ext.deactivateExtension(extension, opts);
      extension.uninstall();
    }
    return extension;
  };
  */
  
  return ext;
}