const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  // ... 기존 설정들
  module: {
    rules: [
      // ... 기존의 로더들
      {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV === "production"
            ? MiniCssExtractPlugin.loader
            : "style-loader",
          "css-loader",
        ],
      },
    ],
  },
  plugins: [
    // ... 기존의 플러그인들
    new MiniCssExtractPlugin(),
  ],
};
