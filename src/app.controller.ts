import { Body, Controller, Get, Param, Post, Query, Redirect, Render } from '@nestjs/common';
import { AppService } from './app.service';
import db from './db';
import { MacskakDto } from './macskak.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async macskakKiir(@Query('szem_szin') szem_szin: string) {
    if (szem_szin == null) {
      const [rows] = await db.execute('SELECT * FROM macskak');

      return {
        macskak: rows,
      };
    } else {
      const [rows] = await db.execute(
        'SELECT * FROM macskak WHERE szem_szin = ?',
        [szem_szin],
      );

      return {
        macskak: rows,
      };
    }
  }
  @Get('cats/new')
  @Render('felvetel')
  newCatForm() {
    return {};
  }

  @Post('cats/new')
  @Redirect()
  async newCat(@Body() macskak: MacskakDto) {
    await db.execute(
      'INSERT INTO macskak (suly, szem_szin) VALUES (?, ?)',
      macskak.suly,
      macskak.szem_szin,
    );
    return {
      url: '/',
    };
  }
}
