{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  name = "nuxt-strapi-blocks-renderer";

  buildInputs = [
    pkgs.nodejs_22
    pkgs.git
  ];
}
