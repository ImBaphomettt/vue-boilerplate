fx_version "cerulean"
games { "gta5" }

lua54 "yes"

dependency {}

ui_page 'build/index.html'

files {
    'build/index.html',
    'build/**/*',
}

client_scripts {
    "lua-controllers/**/C*.lua",
}

server_scripts {
    "lua-controllers/**/S*.lua",
}

escrow_ignore {}