import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Stock, Portfolio, MarketDepth } from '../../types';
import { XIcon } from '../icons';

const formatIndianCurrency = (value: number) => {
    return `₹${value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

interface TradeModalProps {
    stock: Stock;
    portfolio: Portfolio;
    tradeType: 'Buy' | 'Sell';
    onClose: () => void;
    onTrade: (ticker: string, quantity: number, price: number) => void;
    t: (key: string, replacements?: { [key: string]: string | number }) => string;
}

const TradeModal: React.FC<TradeModalProps> = ({ stock, portfolio, tradeType, onClose, onTrade, t }) => {
    const [quantity, setQuantity] = useState('');
    const [productType, setProductType] = useState<'CNC' | 'MIS'>('CNC');
    const quantityNum = parseInt(quantity) || 0;
    const totalCost = quantityNum * stock.price;
    const heldStock = portfolio.holdings.find(h => h.ticker === stock.ticker);
    const maxQuantity = tradeType === 'Buy' ? Math.floor(portfolio.cash / stock.price) : (heldStock?.quantity || 0);
    const isValid = quantityNum > 0 && quantityNum <= maxQuantity;

    const handleTrade = () => {
        if (isValid) {
            onTrade(stock.ticker, quantityNum, stock.price);
            onClose();
        }
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 w-full max-w-sm shadow-2xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className={`text-2xl font-bold ${tradeType === 'Buy' ? 'text-green-400' : 'text-red-400'}`}>{t(tradeType.toLowerCase() as 'buy' | 'sell')} {stock.ticker}</h2>
                    <button onClick={onClose}><XIcon className="w-6 h-6 hover:text-red-500 transition-colors" /></button>
                </div>
                <div className="space-y-4">
                    <div className="flex justify-center space-x-2 p-1 bg-slate-700 rounded-md">
                        <button onClick={() => setProductType('CNC')} className={`w-full py-1 rounded ${productType === 'CNC' ? 'bg-sky-600' : ''}`}>{t('cnc')}</button>
                        <button onClick={() => setProductType('MIS')} className={`w-full py-1 rounded ${productType === 'MIS' ? 'bg-sky-600' : ''}`}>{t('mis')}</button>
                    </div>

                    <p>{t('ltp')}: <span className="font-semibold">{formatIndianCurrency(stock.price)}</span></p>
                    {tradeType === 'Sell' && <p>{t('holdings_qty')}: <span className="font-semibold">{heldStock?.quantity || 0} {t('qty_symbol')}</span></p>}
                    
                    <div>
                        <label htmlFor="quantity" className="block text-sm font-medium text-slate-300">{t('quantity')}</label>
                        <div className="relative mt-1">
                          <input
                              type="number"
                              id="quantity"
                              value={quantity}
                              onChange={(e) => setQuantity(e.target.value)}
                              min="0"
                              max={maxQuantity}
                              className="block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500"
                          />
                           <button onClick={() => setQuantity(maxQuantity.toString())} className="absolute right-2 top-2 text-xs text-sky-400 hover:text-sky-300">{t('max')}</button>
                        </div>
                    </div>

                    <div className="flex justify-between items-center text-lg">
                        <span>{t('required_funds')}:</span>
                        <span className="font-semibold">{formatIndianCurrency(totalCost)}</span>
                    </div>

                    <button
                        onClick={handleTrade}
                        disabled={!isValid}
                        className={`w-full py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                            tradeType === 'Buy' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
                        } disabled:bg-slate-500 disabled:cursor-not-allowed transition-colors`}
                    >
                        {t('confirm_trade', { tradeType: t(tradeType.toLowerCase() as 'buy' | 'sell') })}
                    </button>
                </div>
            </div>
        </div>
    );
};

const MarketDepthView: React.FC<{ depth: MarketDepth, t: (key: string) => string }> = ({ depth, t }) => (
    <div className="bg-slate-800 border border-slate-700 p-4 rounded-lg h-full">
        <h3 className="text-lg font-bold mb-2 text-center">{t('market_depth')}</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
            {/* Bids */}
            <div>
                <div className="flex justify-between p-1 border-b border-slate-600">
                    <span className="font-bold text-green-400">{t('bids')}</span>
                    <span className="text-slate-400">{t('qty_symbol')}</span>
                </div>
                {depth.bids.map((order, i) => (
                    <div key={i} className="flex justify-between p-1 items-center hover:bg-green-500/10">
                        <span className="text-green-400">{order.price.toFixed(2)}</span>
                        <span className="text-slate-300">{order.quantity}</span>
                    </div>
                ))}
            </div>
            {/* Asks */}
            <div>
                <div className="flex justify-between p-1 border-b border-slate-600">
                    <span className="font-bold text-red-400">{t('asks')}</span>
                    <span className="text-slate-400">{t('qty_symbol')}</span>
                </div>
                {depth.asks.map((order, i) => (
                    <div key={i} className="flex justify-between p-1 items-center hover:bg-red-500/10">
                        <span className="text-red-400">{order.price.toFixed(2)}</span>
                        <span className="text-slate-300">{order.quantity}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
);


interface TradeScreenProps {
    stocks: Stock[];
    portfolio: Portfolio;
    setPortfolio: React.Dispatch<React.SetStateAction<Portfolio>>;
    t: (key: string, replacements?: { [key: string]: string | number }) => string;
}

const TradeScreen: React.FC<TradeScreenProps> = ({ stocks, portfolio, setPortfolio, t }) => {
    const [selectedStock, setSelectedStock] = useState<Stock>(stocks[0]);
    const [modal, setModal] = useState<'Buy' | 'Sell' | null>(null);
    
    const handleTrade = (ticker: string, quantity: number, price: number) => {
        setPortfolio(prev => {
            const newPortfolio = JSON.parse(JSON.stringify(prev));
            if (modal === 'Buy') {
                newPortfolio.cash -= quantity * price;
                const existingHolding = newPortfolio.holdings.find((h: { ticker: string; }) => h.ticker === ticker);
                if (existingHolding) {
                    const totalQuantity = existingHolding.quantity + quantity;
                    const totalCost = (existingHolding.avgPrice * existingHolding.quantity) + (price * quantity);
                    existingHolding.avgPrice = totalCost / totalQuantity;
                    existingHolding.quantity = totalQuantity;
                } else {
                    newPortfolio.holdings.push({ ticker, quantity, avgPrice: price });
                }
            } else if (modal === 'Sell') {
                newPortfolio.cash += quantity * price;
                const holdingIndex = newPortfolio.holdings.findIndex((h: { ticker: string; }) => h.ticker === ticker);
                if (holdingIndex > -1) {
                    newPortfolio.holdings[holdingIndex].quantity -= quantity;
                    if (newPortfolio.holdings[holdingIndex].quantity === 0) {
                        newPortfolio.holdings.splice(holdingIndex, 1);
                    }
                }
            }
            return newPortfolio;
        });
    };

    const dailyChange = selectedStock.price - selectedStock.close;
    const dailyChangePercent = (dailyChange / selectedStock.close) * 100;
    const changeColor = dailyChange >= 0 ? 'text-green-400' : 'text-red-400';

    return (
        <div className="p-4 space-y-6">
            {modal && <TradeModal stock={selectedStock} portfolio={portfolio} tradeType={modal} onClose={() => setModal(null)} onTrade={handleTrade} t={t} />}
            
            <div className="bg-slate-800 border border-slate-700 p-4 rounded-lg">
                 <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
                    {stocks.map(stock => (
                        <button key={stock.ticker} onClick={() => setSelectedStock(stock)} className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedStock.ticker === stock.ticker ? 'bg-sky-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>
                            {stock.ticker}
                        </button>
                    ))}
                 </div>
                 <div className="mb-4">
                    <h2 className="text-xl font-bold">{selectedStock.name}</h2>
                    <div className="flex items-baseline space-x-2">
                      <p className={`text-3xl font-bold ${changeColor}`}>{formatIndianCurrency(selectedStock.price)}</p>
                      <p className={`text-lg font-semibold ${changeColor}`}>{dailyChange.toFixed(2)} ({dailyChangePercent.toFixed(2)}%)</p>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                        <div className="h-64 mb-4">
                           <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={selectedStock.history} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                   <defs>
                                       <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                       <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                                       <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                                       </linearGradient>
                                   </defs>
                                   <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 12 }} tickFormatter={(str) => str.slice(5)} stroke="#475569" />
                                   <YAxis domain={['dataMin - 10', 'dataMax + 10']} tick={{ fill: '#94a3b8', fontSize: 12 }} stroke="#475569" tickFormatter={(val) => val.toLocaleString('en-IN')} />
                                   <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.5rem' }} formatter={(value: number) => [formatIndianCurrency(value), 'Price']} />
                                   <Area type="monotone" dataKey="price" stroke="#38bdf8" fillOpacity={1} fill="url(#colorPrice)" strokeWidth={2} />
                               </AreaChart>
                           </ResponsiveContainer>
                        </div>
                        <div className="text-xs grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-400">
                            <p>{t('open')}: <span className="font-medium text-white">{selectedStock.open.toFixed(2)}</span></p>
                            <p>{t('high')}: <span className="font-medium text-white">{selectedStock.high.toFixed(2)}</span></p>
                            <p>{t('low')}: <span className="font-medium text-white">{selectedStock.low.toFixed(2)}</span></p>
                            <p>{t('prev_close')}: <span className="font-medium text-white">{selectedStock.close.toFixed(2)}</span></p>
                            <p>{t('volume')}: <span className="font-medium text-white">{selectedStock.volume.toLocaleString('en-IN')}</span></p>
                        </div>
                    </div>
                    <div className="md:col-span-1">
                        <MarketDepthView depth={selectedStock.marketDepth} t={t} />
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4 mt-4">
                    <button onClick={() => setModal('Buy')} className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-4 rounded-lg transition-colors">{t('buy')}</button>
                    <button onClick={() => setModal('Sell')} className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-4 rounded-lg transition-colors">{t('sell')}</button>
                 </div>
            </div>

            <div className="bg-slate-800 border border-slate-700 p-4 rounded-lg">
                <h3 className="text-xl font-bold mb-2">{t('my_holdings')}</h3>
                <div className="space-y-2">
                    {portfolio.holdings.length > 0 ? portfolio.holdings.map((holding, index) => {
                        const stockData = stocks.find(s => s.ticker === holding.ticker);
                        if (!stockData) return null;
                        const marketValue = stockData.price * holding.quantity;
                        const totalCost = holding.avgPrice * holding.quantity;
                        const gainLoss = marketValue - totalCost;
                        const gainLossPercent = totalCost > 0 ? (gainLoss / totalCost) * 100 : 0;
                        return (
                             <div key={holding.ticker} className={`flex justify-between items-center py-3 ${index < portfolio.holdings.length - 1 ? 'border-b border-slate-700' : ''}`}>
                                <div>
                                    <p className="font-bold text-lg">{holding.ticker}</p>
                                    <p className="text-sm text-slate-400">{t('holding_details', { quantity: holding.quantity, price: formatIndianCurrency(holding.avgPrice) })}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold">{formatIndianCurrency(marketValue)}</p>
                                    <p className="text-xs text-slate-400">{t('ltp')}: {formatIndianCurrency(stockData.price)}</p>
                                </div>
                                <div className={`text-right font-semibold w-28 ${gainLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                    <p>{gainLoss >= 0 ? '+' : ''}{formatIndianCurrency(gainLoss)}</p>
                                    <p className="text-xs">({gainLossPercent.toFixed(2)}%)</p>
                                </div>
                            </div>
                        );
                    }) : <p className="text-slate-400 text-center py-4">{t('no_holdings')}</p>}
                </div>
            </div>
        </div>
    );
};

export default TradeScreen;