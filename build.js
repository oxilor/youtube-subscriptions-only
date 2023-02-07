import AdmZip from 'adm-zip';

const zip = new AdmZip();
zip.addLocalFolder('src');
zip.writeZip('output.zip');
