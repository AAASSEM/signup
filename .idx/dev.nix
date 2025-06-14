{ pkgs, ... }: {
  channel = "stable-24.05"; # or "unstable" 
  packages = [
    pkgs.nodejs_20
  ];
  env = {};
  idx = {
    extensions = [];
    workspace = {
      onCreate = {
        npm-install = "npm install --no-audit --prefer-offline --no-progress --timing";
        default.openFiles = [ "src/App.jsx" ];
      };
    };
    previews = {
      enable = true;
      previews = {
        web = {
          command = ["npm" "run" "dev" "--" "--port" "$PORT" "--host" "0.0.0.0"];
          manager = "web";
        };
      };
    };
  };
}