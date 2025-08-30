{ config, pkgs, lib, ...}:

let
  currd = builtins.toString ./.;
in
{

  config = {
    home.packages = with pkgs; [
      nodejs_20
    ];

  };

}