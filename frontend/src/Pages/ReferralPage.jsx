import React from "react";
import { Copy, ArrowRight, Share2, Coins, Crown, Handshake, Info, Gift, HelpCircle, ShieldCheck, User } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

const referralCode = "0J7X4G";

const rewards = [
  { coins: 150, label: "1st referral" },
  { coins: 175, label: "2nd referral" },
  { coins: 200, label: "3rd referral" },
  { coins: 225, label: "4th referral" },
];

const howItWorks = [
  {
    icon: <Handshake className="w-6 h-6 text-[#6e7fdc]" />, // Handshake
    text: "You will earn coins based on your referral count after your friend avails their first booking.",
  },
  {
    icon: <User className="w-6 h-6 text-[#6e7fdc]" />, // User
    text: "Your friend will earn 125 coins when they use your referral code while signing up.",
  },
  {
    icon: <Crown className="w-6 h-6 text-[#ffb800]" />, // Crown
    text: "You will earn a free service once you become brand ambassador.",
  },
  {
    icon: <Coins className="w-6 h-6 text-yellow-500" />, // Coins
    text: "Your referral coins will add up & you can redeem them as discount on services.",
  },
];

const howToAvail = [
  "Unlock free service on reaching the milestone referral level (5th, 10th or 15th).",
  "Apply given coupon code while checking out.",
  "Coupon code will only be applicable on referrer's account.",
];

const ReferralPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#b6c6f5] to-[#6e7fdc] w-full">
      <main className="flex-1 flex flex-col items-center py-8 px-2 md:px-6 w-full">
        <div className="w-full max-w-5xl flex flex-col items-center">
          {/* Title */}
          <div className="text-center mt-2 mb-6 w-full">
            <div className="text-2xl md:text-3xl font-extrabold text-[#6e7fdc] tracking-wide drop-shadow-sm">REFER & EARN</div>
            <div className="text-3xl md:text-4xl font-extrabold text-yellow-500 mt-3 mb-1 flex items-center justify-center gap-2 drop-shadow">
              <Coins className="w-8 h-8 text-[#ffb800]" /> COINS
            </div>
            <div className="text-2xl md:text-3xl font-extrabold text-[#2d2d2d] mb-2 drop-shadow">WORTH ₹5000</div>
            <div className="inline-block bg-[#e6eaff] text-[#6e7fdc] px-6 py-2 rounded-full font-semibold text-lg mb-3 shadow">
              Referral Rewards
            </div>
            <div className="text-gray-700 font-medium text-lg md:text-xl mt-1">
              Earn coins on every referral and free services when you become <span className="font-bold text-[#6e7fdc] flex items-center gap-1"><Crown className="w-5 h-5 inline text-[#ffb800]" /> Brand Ambassador</span>
            </div>
            <div className="bg-[#e6eaff] text-[#6e7fdc] font-bold px-6 py-2 rounded-full inline-block mt-4 text-lg shadow flex items-center gap-2">
              <Coins className="w-5 h-5 text-yellow-500" /> 1 Coin = ₹1
            </div>
          </div>
          {/* Rewards Row */}
          <div className="w-full flex flex-wrap justify-center gap-6 mt-6 mb-4">
            {rewards.map((r, i) => (
              <div key={i} className="flex flex-col items-center bg-white shadow rounded-xl px-8 py-5 min-w-[120px] transition hover:scale-105 hover:shadow-lg">
                <Coins className="w-7 h-7 text-yellow-500 mb-1" />
                <div className="text-yellow-500 font-bold text-2xl">{r.coins}</div>
                <div className="text-base text-gray-600 font-semibold mt-2">{r.label}</div>
              </div>
            ))}
          </div>
          {/* 5th Referral */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-6 mb-4 w-full">
            <div className="flex items-center bg-white shadow rounded-xl px-7 py-4">
              <Coins className="w-6 h-6 text-yellow-500 mr-2" />
              <span className="text-yellow-500 font-bold text-xl mr-3">250 Coins</span>
              <span className="mx-3 font-bold text-xl text-[#6e7fdc]">+</span>
              <Gift className="w-5 h-5 text-[#6e7fdc] mr-1" />
              <span className="bg-[#e6eaff] text-[#6e7fdc] font-semibold px-4 py-1 rounded-full text-sm mr-3">FREE SERVICE</span>
              <span className="font-medium text-gray-700 text-base">Full Arms + Underarm...</span>
            </div>
            <span className="font-bold text-[#6e7fdc] text-lg md:text-xl flex items-center gap-1"><Crown className="w-5 h-5 text-[#ffb800]" /> Become BRAND AMBASSADOR</span>
          </div>
          {/* View All Rewards */}
          <button className="w-full max-w-md mt-8 mb-6 bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-4 rounded-xl text-xl flex items-center justify-center gap-3 shadow transition">
            VIEW ALL REWARDS <ArrowRight className="w-6 h-6" />
          </button>
          {/* How it works */}
          <div className="w-full mt-8">
            <div className="text-center text-xl md:text-2xl font-bold text-[#6e7fdc] mb-5">How it Works</div>
            <div className="flex flex-col gap-4">
              {howItWorks.map((item, i) => (
                <div key={i} className="flex items-start gap-4 bg-[#e6eaff] rounded-lg px-6 py-4 shadow">
                  <span>{item.icon}</span>
                  <span className="text-gray-700 font-medium text-base md:text-lg">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          {/* How to Avail Free Service */}
          <div className="w-full mt-8">
            <div className="text-center text-xl md:text-2xl font-bold text-[#6e7fdc] mb-5">How to Avail Free Service?</div>
            <div className="bg-[#e6eaff] rounded-lg px-6 py-6 shadow">
              <ul className="list-disc pl-6 text-gray-700 text-base md:text-lg font-medium space-y-2">
                {howToAvail.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
          {/* FAQ & Terms */}
          <div className="w-full flex flex-col md:flex-row gap-4 mt-8">
            <button className="flex-1 flex items-center justify-between bg-white rounded-lg px-5 py-4 shadow font-semibold text-[#6e7fdc] text-base hover:bg-[#e6eaff] transition">
              Frequently asked questions <HelpCircle className="w-5 h-5" />
            </button>
            <button className="flex-1 flex items-center justify-between bg-white rounded-lg px-5 py-4 shadow font-semibold text-[#6e7fdc] text-base hover:bg-[#e6eaff] transition">
              Terms & conditions <ShieldCheck className="w-5 h-5" />
            </button>
          </div>
          {/* Referral Code & Share */}
          <div className="w-full flex flex-col md:flex-row items-center gap-4 mt-8 mb-2">
            <div className="flex-1 bg-[#e6eaff] rounded-lg px-5 py-4 flex items-center justify-between">
              <span className="font-semibold text-[#6e7fdc] text-base">Your Referral Code: <span className="text-[#ffb800]">{referralCode}</span></span>
              <button
                className="ml-3 p-2 rounded-full bg-white hover:bg-gray-100 text-[#6e7fdc] transition"
                onClick={() => navigator.clipboard.writeText(referralCode)}
                aria-label="Copy referral code"
              >
                <Copy className="w-5 h-5" />
              </button>
            </div>
            <button className="flex-1 bg-white rounded-lg px-5 py-4 flex items-center justify-center gap-2 font-bold text-[#2d2d2d] text-base shadow hover:bg-[#e6eaff] transition">
              INVITE VIA WHATSAPP <SiWhatsapp className="w-5 h-5 text-green-500" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReferralPage;