import path from 'path';
import { app } from 'electron';

/**
 * 
 * @returns 
 */
export function isDev(): boolean {
    return process.env.NODE_ENV === "development";
}

/**
 * 
 * @returns 
 */
export function getIndexPath(): string {
    return path.join(app.getAppPath(), "dist-react", "index.html");
}

/**
 * 
 * @returns 
 */
export function getPreloadPath(): string {
    const preloadRootPath = path.join(app.getAppPath(), isDev() ? "." : "..");
    return path.join(preloadRootPath, "dist-electron", "preload.cjs");
}