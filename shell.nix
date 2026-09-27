{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  name = "nuxt-strapi-blocks-renderer";

  buildInputs = [
    pkgs.nodejs_24
    pkgs.pnpm
    pkgs.git
    pkgs.gh
  ];
}
