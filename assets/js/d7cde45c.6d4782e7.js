"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[243],{3905:function(e,t,n){n.d(t,{Zo:function(){return h},kt:function(){return d}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var u=a.createContext({}),l=function(e){var t=a.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},h=function(e){var t=l(e.components);return a.createElement(u.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},p=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,u=e.parentName,h=s(e,["components","mdxType","originalType","parentName"]),p=l(n),d=r,m=p["".concat(u,".").concat(d)]||p[d]||c[d]||o;return n?a.createElement(m,i(i({ref:t},h),{},{components:n})):a.createElement(m,i({ref:t},h))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=p;var s={};for(var u in t)hasOwnProperty.call(t,u)&&(s[u]=t[u]);s.originalType=e,s.mdxType="string"==typeof e?e:r,i[1]=s;for(var l=2;l<o;l++)i[l]=n[l];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}p.displayName="MDXCreateElement"},6799:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return u},metadata:function(){return l},toc:function(){return h},default:function(){return p}});var a=n(7462),r=n(3366),o=(n(7294),n(3905)),i=["components"],s={sidebar_position:2},u="Token Vault",l={unversionedId:"architecture/deep_dive/token_vault",id:"architecture/deep_dive/token_vault",isDocsHomePage:!1,title:"Token Vault",description:"Overview",source:"@site/docs/architecture/deep_dive/token_vault.md",sourceDirName:"architecture/deep_dive",slug:"/architecture/deep_dive/token_vault",permalink:"/docs/docs/architecture/deep_dive/token_vault",editUrl:"https://github.com/metaplex/docs/docs/architecture/deep_dive/token_vault.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"sidebar",previous:{title:"Overview",permalink:"/docs/docs/architecture/deep_dive/overview"},next:{title:"Auction",permalink:"/docs/docs/architecture/deep_dive/auction"}},h=[{value:"Overview",id:"overview",children:[]},{value:"Types",id:"types",children:[{value:"Vault",id:"vault",children:[]},{value:"Safety Deposit Box",id:"safety-deposit-box",children:[]},{value:"External Price Account",id:"external-price-account",children:[]}]},{value:"Concepts",id:"concepts",children:[{value:"Vault State Machine",id:"vault-state-machine",children:[]}]}],c={toc:h};function p(e){var t=e.components,n=(0,r.Z)(e,i);return(0,o.kt)("wrapper",(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"token-vault"},"Token Vault"),(0,o.kt)("h2",{id:"overview"},"Overview"),(0,o.kt)("p",null,"The Token Vault serves two purposes in the Metaplex ecosystem: Storing tokens for safe-keeping for the Auction Manager, and as a fractionalization service for NFTs. It has two primary concepts, that of the Vault and of the Safety Deposit Box. A Vault can have any number of Safety Deposit Boxes, one per unique mint being stored. A Vault goes through many phases in life-cycle, but the two important ones are when it's ",(0,o.kt)("strong",{parentName:"p"},"Activated")," and when it is ",(0,o.kt)("strong",{parentName:"p"},"Combined"),". When it is ",(0,o.kt)("strong",{parentName:"p"},"Activated"),", new fractional shares can be minted and distributed for partial ownership, and when it is ",(0,o.kt)("strong",{parentName:"p"},"Combined"),", fractional owners can burn their shares in exchange for remuneration and the vault authority can retrieve the stored tokens in the Vault."),(0,o.kt)("p",null,"Below is the Rust state stored on chain:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rust"},"#[repr(C)]\n#[derive(Clone, BorshSerialize, BorshDeserialize, PartialEq)]\npub enum Key {\n    Uninitialized,\n    SafetyDepositBoxV1,\n    ExternalAccountKeyV1,\n    VaultV1,\n}\n\n#[repr(C)]\n#[derive(Clone, BorshSerialize, BorshDeserialize, PartialEq)]\npub enum VaultState {\n    Inactive,\n    Active,\n    Combined,\n    Deactivated,\n}\n\n#[repr(C)]\n#[derive(Clone, BorshSerialize, BorshDeserialize)]\npub struct Vault {\n    pub key: Key,\n    /// Store token program used\n    pub token_program: Pubkey,\n    /// Mint that produces the fractional shares\n    pub fraction_mint: Pubkey,\n    /// Authority who can make changes to the vault\n    pub authority: Pubkey,\n    /// treasury where fractional shares are held for redemption by authority\n    pub fraction_treasury: Pubkey,\n    /// treasury where monies are held for fractional share holders to redeem(burn) shares once buyout is made\n    pub redeem_treasury: Pubkey,\n    /// Can authority mint more shares from fraction_mint after activation\n    pub allow_further_share_creation: bool,\n\n    /// Must point at an ExternalPriceAccount, which gives permission and price for buyout.\n    pub pricing_lookup_address: Pubkey,\n    /// In inactive state, we use this to set the order key on Safety Deposit Boxes being added and\n    /// then we increment it and save so the next safety deposit box gets the next number.\n    /// In the Combined state during token redemption by authority, we use it as a decrementing counter each time\n    /// The authority of the vault withdrawals a Safety Deposit contents to count down how many\n    /// are left to be opened and closed down. Once this hits zero, and the fraction mint has zero shares,\n    /// then we can deactivate the vault.\n    pub token_type_count: u8,\n    pub state: VaultState,\n\n    /// Once combination happens, we copy price per share to vault so that if something nefarious happens\n    /// to external price account, like price change, we still have the math 'saved' for use in our calcs\n    pub locked_price_per_share: u64,\n}\n\n#[repr(C)]\n#[derive(Clone, BorshSerialize, BorshDeserialize)]\npub struct SafetyDepositBox {\n    // Please note if you change this struct, be careful as we read directly off it\n    // in Metaplex to avoid serialization costs...\n    /// Each token type in a vault has it's own box that contains it's mint and a look-back\n    pub key: Key,\n    /// Key pointing to the parent vault\n    pub vault: Pubkey,\n    /// This particular token's mint\n    pub token_mint: Pubkey,\n    /// Account that stores the tokens under management\n    pub store: Pubkey,\n    /// the order in the array of registries\n    pub order: u8,\n}\n\n#[repr(C)]\n#[derive(Clone, BorshSerialize, BorshDeserialize)]\npub struct ExternalPriceAccount {\n    pub key: Key,\n    pub price_per_share: u64,\n    /// Mint of the currency we are pricing the shares against, should be same as redeem_treasury.\n    /// Most likely will be USDC mint most of the time.\n    pub price_mint: Pubkey,\n    /// Whether or not combination has been allowed for this vault.\n    pub allowed_to_combine: bool,\n}\n\n")),(0,o.kt)("p",null,"The instruction set for the vault can be found here: ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/metaplex-foundation/metaplex/blob/master/rust/token-vault/program/src/instruction.rs"},"https://github.com/metaplex-foundation/metaplex/blob/master/rust/token-vault/program/src/instruction.rs")),(0,o.kt)("h2",{id:"types"},"Types"),(0,o.kt)("h3",{id:"vault"},"Vault"),(0,o.kt)("p",null,"The Big Kahuna and namesake of this contract, the Vault is really a container of many concepts. The Vault can be used without any fractional share emissions as a kind of escrow service for many different tokens of different mint types, and indeed, this is what Metaplex uses it for when performing Auctions. However it can also be used to provide partial ownership of NFTs to interested investors. Let's break down the keys in the Vault's state one by one."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Fractional shares:")," It points at a ",(0,o.kt)("inlineCode",{parentName:"p"},"fractional_mint")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"fractional_treasury"),", which allows the vault authority to mint new fractional shares to a treasury account before (or optionally after) ",(0,o.kt)("strong",{parentName:"p"},"Activation")," of the vault. Shares inside the treasury don't count towards the cost of ",(0,o.kt)("strong",{parentName:"p"},"Combining")," the vault."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Redeem treasury:")," This account is used to hold in escrow the funds used to pay off fractional shareholders when the vault authority wishes to ",(0,o.kt)("strong",{parentName:"p"},"Combine")," the vault and regain possession of the stored assets inside. The vault authority has to pay shares_in_circulation","*","price_of_shares into this redeem treasury. The mint of the treasury is completely decidable by the vault authority, we make no opinions on that."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Pricing Lookup Address:")," This is a pointer to an ExternalLookupAccount, which while its struct is defined by the Token Vault program, the account itself does not need to be owned by the vault program or anything within it. It is meant to be an external pricing oracle that is independent of the vault authority or vault that provides pricing data on the fractional share price so that the fractional share owners get a fair buyout by the vault authority."),(0,o.kt)("p",null,"Token Vaults do not have PDA addresses."),(0,o.kt)("h3",{id:"safety-deposit-box"},"Safety Deposit Box"),(0,o.kt)("p",null,"A safety deposit box keeps track of the token account containing the tokens, its vault, and what order in the vault it maintains. If it was inserted 3rd, it's order is 2 (0-based.) It's a pretty simple setup. And yes, you should be aware the safety deposit box doesn't ",(0,o.kt)("em",{parentName:"p"},"actually")," store any tokens - it contains a ",(0,o.kt)("inlineCode",{parentName:"p"},"store")," key that points to an spl-token account that contains the tokens. It's more of a foreign key join table between the vault and the store."),(0,o.kt)("p",null,"Safety Deposit Boxes always have PDA addresses of type ",(0,o.kt)("inlineCode",{parentName:"p"},"['vault', vault_key, mint_key]"),"."),(0,o.kt)("h3",{id:"external-price-account"},"External Price Account"),(0,o.kt)("p",null,"The External Price Account is meant to be used as an external oracle. It is provided to a Vault on initialization and doesn't need to be owned or controlled by the vault authority (though it can be.) It can provide data on the ",(0,o.kt)("inlineCode",{parentName:"p"},"price_per_share")," of fractional shares, whether or not the vault authority is currently allowed to ",(0,o.kt)("strong",{parentName:"p"},"Combine")," the vault and reclaim the contents, and what the ",(0,o.kt)("inlineCode",{parentName:"p"},"price_mint")," of the vault is."),(0,o.kt)("p",null,"ExternalPriceAccounts do not have PDA addresses."),(0,o.kt)("h2",{id:"concepts"},"Concepts"),(0,o.kt)("h3",{id:"vault-state-machine"},"Vault State Machine"),(0,o.kt)("p",null,"A Vault begins its journey in the ",(0,o.kt)("strong",{parentName:"p"},"Inactive"),' state. It is in this state that tokens can be added, and fractional shares can be minted into the fractional treasury. The idea is this phase is the "prep" where we are getting the Vault ready for use as an escrow or as a holding corporation for fractional ownership of NFTs.'),(0,o.kt)("p",null,"Once the vault is ",(0,o.kt)("strong",{parentName:"p"},"Activated"),", the Vault is closed, and the vault authority may ",(0,o.kt)("em",{parentName:"p"},"not")," remove the tokens from the Vault. Furthermore, no new fractional shares may be minted unless during initialization the special ",(0,o.kt)("inlineCode",{parentName:"p"},"allow_further_share_creation")," boolean was set. Some fractional share owners may not be too enthused about buying into a vault only to be diluted later, so we make this a one-time thing during initialization where the vault authority gets to choose what kind of vault it gets to be. The vault authority ",(0,o.kt)("em",{parentName:"p"},"can")," however, remove shares from the treasury and give them to whomever they want, or start a dex with them, or an AMM, or what have you. These shares represent partial ownership of the vault now!"),(0,o.kt)("p",null,"Let's now say that the vault authority now wants to regain access to the Vault's contents. To do this, first, the ExternalPriceAccount tied to the vault needs to have ",(0,o.kt)("inlineCode",{parentName:"p"},"allowed_to_combine")," set to true. If this is the case, the vault authority can then ",(0,o.kt)("strong",{parentName:"p"},"Combine")," the Vault, providing a token account with enough tokens to pay off all outstanding fractional share holders to the Vault. The Vault will drain this account to the ",(0,o.kt)("inlineCode",{parentName:"p"},"redeem_treasury")," and the Vault will move to the ",(0,o.kt)("strong",{parentName:"p"},"Combined")," state. The Vault will use the ",(0,o.kt)("inlineCode",{parentName:"p"},"price_per_share")," on the ExternalPriceAccount for this calculation. If no shares are outstanding, this ",(0,o.kt)("strong",{parentName:"p"},"Combination")," operation is free. During ",(0,o.kt)("strong",{parentName:"p"},"Combination"),", the vault authority also has the option to transmit vault authority to a new authority. Also note that all shares remaining in the fractional treasury are burned in this step."),(0,o.kt)("p",null,"Once ",(0,o.kt)("strong",{parentName:"p"},"Combined"),", the Vault's contents can now be emptied by the vault authority, and fractional share owners can redeem (and burn) their fractional share tokens for tokens from the ",(0,o.kt)("inlineCode",{parentName:"p"},"redeem_treasury"),". When all tokens in all safety deposit boxes have been removed, and all fractional tokens have been burned, the Vault will automatically move to the ",(0,o.kt)("strong",{parentName:"p"},"Deactivated")," state."))}p.isMDXComponent=!0}}]);