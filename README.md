# Vue (3.5) + Vite (Rolldown 7.2) + Tailwindcss (3.4)

<img src="https://i.imgur.com/KPeonlt.png">

I wanted to share my personal integration of Vue, Vite, and TailwindCSS to help those who, like myself, are looking for a boilerplate that fits their needs.

The Lua part is still incomplete and can be significantly improved. The main goal is simply to provide a functional prototype that anyone with the required skills can build upon to create a comfortable development environment for designing their interfaces.

The project structure can also be refined; this is primarily a functional and viable foundation intended as a starting point for anyone searching for a modern Vue boilerplate built on a clean and up-to-date tech stack.

You are, of course, free to use it or not.

To display the interface in-game, run:
 
```bash
show-interface
```

# To start the project in game-only mode:

```bash
npm run dev:game
```

# To start the project in web mode (browser preview):

```bash
npm run dev
```

# To run both simultaneously (browser preview along with real-time recompilation for the in-game rendering):

```bash
npm run start
```

Note that the interface supports 4K displays and automatically scales UI elements smoothly, thanks to TailwindCSS and a dedicated configuration.

Here is the CSS used to make the interface scale based on screen height:

```css
:root {
    /*
     EXPLANATION:

     On a standard Full HD screen (1920x1080), 16px represent roughly 1.5% of the viewport height.

     By setting font-size to 1.48vh (Viewport Height):
     - On 1080p: 1rem ≈ 16px (normal size)
     - On 4K (2160p): 1rem ≈ 32px (automatically doubled)

     Tailwind uses rem units for most utility classes (w-64, p-4, text-xl, etc.),
     so the entire interface scales proportionally while preserving layout and spacing.
    */
    font-size: 1.48vh;
}
```

