{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  name = "nuxt-strapi-blocks-renderer";

  buildInputs = [
    pkgs.nodejs_20
    pkgs.git
  ];

  shellHook = ''
    export NODE_PATH="${pkgs.nodejs_20}/lib/node_modules:$NODE_PATH"
    export PATH="${pkgs.nodejs_20}/bin:$PATH"
  '';
}
