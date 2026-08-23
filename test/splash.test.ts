import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const root = path.join(__dirname, '..');
const splashHtml = fs.readFileSync(path.join(root, 'assets', 'splash.html'), 'utf-8');
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf-8')) as {
  build: { asarUnpack: string[]; icon: string };
};

describe('splash screen', () => {
  it('shows the Apple Music icon rather than the Sidra logo', () => {
    expect(splashHtml).toContain('src="music_icon_DEFAULTMODE.svg"');
    expect(splashHtml).not.toContain('sidra-logo.png');
  });

  it('uses Apple Music launch colours instead of Sidra gold', () => {
    expect(splashHtml).toContain('Apple Music');
    expect(splashHtml).not.toMatch(/#daa520/i);
    expect(splashHtml).toMatch(/#000(?:000)?/);
    expect(splashHtml).toMatch(/#fc3c44/i);
  });

  it('unpacks the splash icon so the packaged page can load it', () => {
    expect(pkg.build.asarUnpack).toContain('assets/music_icon_DEFAULTMODE.svg');
  });
});
