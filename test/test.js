"use strict";

var NCE = require("nce");
var Ext = require("../");
describe('Basic integration in NCE', function(){
  var nce = new NCE();
  it('should be insertable into NCE', function(done){
    var ext = Ext(nce);
    if(ext) return done();
    return done(new Error("Is not able to insert extension into NCE"));
  });
});
describe('Basic functions in NCE', function(){
  var nce = new NCE();
  var ext = Ext(nce);
  
  it('should be installable', function(done){
    if(ext.install()) return done();
    return done(new Error("Can not install extension"));
  });
  it('should be activatable', function(done){
    if(ext.activate()) return done();
    return done(new Error("Can not activate extension"));
  });
  it('should be deactivatable', function(done){
    if(ext.deactivate()) return done();
    return done(new Error("Can not deactivate extension"));
  });
  it('should be uninstallable', function(done){
    if(ext.uninstall()) return done();
    return done(new Error("Can not uninstall extension"));
  });
  
  it('should be installable again', function(done){
    if(ext.install()) return done();
    return done(new Error("Can not install extension"));
  });
  it('should be activatable again', function(done){
    if(ext.activate()) return done();
    return done(new Error("Can not activate extension"));
  });
  it('should be deactivatable again', function(done){
    if(ext.deactivate()) return done();
    return done(new Error("Can not deactivate extension"));
  });
  it('should be uninstallable again', function(done){
    if(ext.uninstall()) return done();
    return done(new Error("Can not uninstall extension"));
  });
});

describe('Basic functions in NCE', function(){
  var nce = new NCE(); /*{"extension-manager":{logger:{level:0}}}*/
  var ext = Ext(nce);
  it('should be able to install itself', function(done){
    if(ext.installExtension(ext) === ext && ext.status === "installed") return done();
    return done(new Error("Can not install extension with itself"));
  });
  it('should be able to activate itself', function(done){
    if(ext.activateExtension(ext) === ext && ext.status === "activated") return done();
    return done(new Error("Can not activate extension with itself"));
  });
  it('should be able to activate i18n directly', function(done){
    if(ext.getActivatedExtension("i18n").package.name === "nce-i18n" && ext.status === "activated") return done();
    return done(new Error("Can not directly activate extension i18n "));
  });
  
});
