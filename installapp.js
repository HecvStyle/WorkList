function openInstallURL() {
  var url = 'itms-services://?action=download-manifest&url=http://git.oschina.net/MD5hashwei/inhouse/blob/master/manifest.plist?dir=0&filepath=manifest.plist';
  window.self.location = url;
}