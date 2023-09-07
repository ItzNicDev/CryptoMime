import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-miner',
  templateUrl: './miner.component.html',
  styleUrls: ['./miner.component.scss'],
})
export class MinerComponent implements OnInit {
  public hash: any;
readonly hashSpeed: number = 85;
  constructor() {
  }

  ngOnInit() {

    this.generateRandom64BitHex();
    setInterval(this.generateRandom64BitHex.bind(this), this.hashSpeed);//lower is better

  }


  generateRandom64BitHex() {
    const highPart = (Math.random() * 0x100000000) >>> 0; // Upper 32 bits
    const lowPart = (Math.random() * 0x100000000) >>> 0; // Lower 32 bits
    const highHex = highPart.toString(16).padStart(8, '0');
    const lowHex = lowPart.toString(16).padStart(8, '0');
    const hex64BitNumber = highHex + lowHex;
    this.hash =  hex64BitNumber;
  }


}
