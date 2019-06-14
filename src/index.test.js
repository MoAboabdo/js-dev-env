import {expect} from 'chai';
import jsdom from 'jsdom';
import { readFileSync } from 'fs'; //fileSystem


describe('Our first test',()=>{
  it('should pss',()=>{
    expect(true).to.equal(true);
  });
});

describe('index.html',()=>{
  it('should have h1 that says Users',(done)=>{
    const index = readFileSync('./src/index.html','UTF-8');
    jsdom.env(index,function(err, window) {
      const h1 = window.document.getElementsByTagName('h1')[0];
      expect(h1.innerHTML).to.equal("Users");
      done();
      window.close();
    });
  });
});
