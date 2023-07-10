const express = require("express");
const path = require("path");
const TelegramBot = require("node-telegram-bot-api");
const config = require('./config');
const server = express();
const bot = new TelegramBot(config.token, {
    polling: true
});
const port = process.env.PORT || 5000;
const queries = {};
const gameName = "Aviator"
const gameName2 = "LuckyJet"
bot.onText(/start|game/, (msg) => bot.sendGame(msg.from.id, gameName));
bot.onText(/start|game/, (msg) => bot.sendGame(msg.from.id, gameName2));
bot.on("callback_query", function (query) {
    if (query.game_short_name !== gameName) {
        bot.answerCallbackQuery(query.id, "Sorry, '" + query.game_short_name + "' is not available.");
    } else {
        queries[query.id] = query;
        bot.answerCallbackQuery({
            callback_query_id: query.id,
            url: config.webAppUrl
        });
    }
});
bot.on("callback_query", function (query) {
    if (query.game_short_name !== gameName2) {
        bot.answerCallbackQuery(query.id, "Sorry, '" + query.game_short_name + "' is not available.");
    } else {
        queries[query.id] = query;
        bot.answerCallbackQuery({
            callback_query_id: query.id,
            url: config.webAppUrl2
        });
    }
});


