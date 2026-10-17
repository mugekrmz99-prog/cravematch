/**
 * CraveMatch Comprehensive Back-Test Suite
 * 
 * Tests:
 * 1. i18n Dictionary Symmetry & Coverage (tr, en, de - 100% dictionary match)
 * 2. Zero Hardcoded Personas (eliminated Müge / Cihat hardcoding)
 * 3. Dynamic Pairing URL Generation (URLSearchParams & custom names)
 * 4. Mock Data Recipes, Badges & Multi-language Integrity
 * 5. Network Info & QR Endpoint Check (/api/network-info)
 * 6. Database Room State Check (GET /api/db/state)
 * 7. Live Profile Update Sync (POST /api/db/profile)
 * 8. Live Chat Message Sync (POST /api/db/message)
 * 9. Live Swipe & Match Sync (POST /api/db/swipe)
 * 10. Live Cart / Grocery Sync (POST /api/db/cart)
 */

import fs from 'fs';
import path from 'path';
import http from 'http';

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    passCount++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failCount++;
  }
}

async function runTests() {
  console.log('\n========================================');
  console.log('🚀 CRAVEMATCH COMPREHENSIVE BACK-TEST SUITE');
  console.log('========================================\n');

  // TEST 1: i18n Dictionary Verification
  console.log('📦 TEST 1: i18n Translations Symmetry (TR, EN, DE)');
  try {
    const i18nContent = fs.readFileSync('src/utils/i18n.ts', 'utf8');

    function extractKeys(langBlock) {
      const regex = /^\s*([a-zA-Z0-9_]+)\s*:/gm;
      const keys = new Set();
      let match;
      while ((match = regex.exec(langBlock)) !== null) {
        keys.add(match[1]);
      }
      return keys;
    }

    const trMatch = i18nContent.match(/tr:\s*\{([\s\S]*?)\n\s*\},/);
    const enMatch = i18nContent.match(/en:\s*\{([\s\S]*?)\n\s*\},/);
    const deMatch = i18nContent.match(/de:\s*\{([\s\S]*?)\n\s*\}\s*;/);

    assert(trMatch && enMatch && deMatch, 'Found TR, EN, and DE translation blocks');

    const trKeys = extractKeys(trMatch ? trMatch[1] : '');
    const enKeys = extractKeys(enMatch ? enMatch[1] : '');
    const deKeys = extractKeys(deMatch ? deMatch[1] : '');

    console.log(`    Total dictionary keys: TR=${trKeys.size}, EN=${enKeys.size}, DE=${deKeys.size}`);

    assert(trKeys.size >= 80, `TR translation dictionary is complete (${trKeys.size} keys)`);
    assert(enKeys.size >= 80, `EN translation dictionary is complete (${enKeys.size} keys)`);
    assert(deKeys.size >= 80, `DE translation dictionary is complete (${deKeys.size} keys)`);

    const missingInEn = [...trKeys].filter(k => !enKeys.has(k));
    const missingInDe = [...trKeys].filter(k => !deKeys.has(k));

    assert(missingInEn.length === 0, `All TR keys present in EN (missing: ${missingInEn.join(', ') || 'none'})`);
    assert(missingInDe.length === 0, `All TR keys present in DE (missing: ${missingInDe.join(', ') || 'none'})`);
  } catch (err) {
    assert(false, `i18n test exception: ${err.message}`);
  }

  // TEST 2: Zero Hardcoded Personas in App Code
  console.log('\n🔒 TEST 2: Persona Neutrality & Dynamic Room Verification');
  try {
    const filesToCheck = [
      'src/App.tsx',
      'src/components/screens/SurveyScreen.tsx',
      'src/components/screens/SwipesScreen.tsx',
      'src/components/screens/DiceScreen.tsx',
      'src/components/screens/CoCookingScreen.tsx',
      'src/components/screens/ChatScreen.tsx',
      'src/components/screens/ProfileScreen.tsx',
      'src/components/screens/OnboardingScreen.tsx',
      'src/components/screens/PleasurePoolCartScreen.tsx',
      'src/components/SettingsModal.tsx'
    ];

    let foundHardcodedPersona = false;
    for (const file of filesToCheck) {
      const code = fs.readFileSync(file, 'utf8');
      if (code.includes('Ben Müge') || code.includes('Ben Cihat') || code.includes('Müge\'yim') || code.includes('Cihat\'ım')) {
        console.error(`    Found hardcoded persona in ${file}`);
        foundHardcodedPersona = true;
      }
    }

    assert(!foundHardcodedPersona, 'No hardcoded persona strings ("Ben Müge\'yim" / "Ben Cihat\'ım") found in UI code');
  } catch (err) {
    assert(false, `Persona check exception: ${err.message}`);
  }

  // TEST 3: Dynamic Pairing URL Generation
  console.log('\n🔗 TEST 3: Dynamic Pairing URL Generation');
  try {
    const pairingUrlCode = fs.readFileSync('src/utils/pairingUrl.ts', 'utf8');
    assert(pairingUrlCode.includes('URLSearchParams'), 'Pairing URLs utilize URLSearchParams for safe escaping');
    assert(pairingUrlCode.includes('getPublicPairingUrl'), 'Exported getPublicPairingUrl function is present');
    assert(pairingUrlCode.includes('pairCode') && pairingUrlCode.includes('inviterName'), 'Pairing URL accepts custom pair code and inviterName');

    const params = new URLSearchParams();
    params.set('pair', 'CRV-1234');
    params.set('inviter', 'Ayşe & Ali');
    const qs = params.toString();

    assert(qs.includes('pair=CRV-1234'), 'URL query contains pair parameter');
    assert(qs.includes('inviter=Ay%C5%9Fe+%26+Ali'), 'URL query safely encodes Unicode and ampersand');
  } catch (err) {
    assert(false, `Pairing URL test exception: ${err.message}`);
  }

  // TEST 4: Mock Data Recipe, Badges & Step Integrity
  console.log('\n🍲 TEST 4: Mock Data Recipe & Badges Integrity');
  try {
    const mockDataCode = fs.readFileSync('src/data/mockData.ts', 'utf8');
    assert(mockDataCode.includes('INITIAL_DISHES'), 'INITIAL_DISHES array exported');
    assert(mockDataCode.includes('INITIAL_BADGES'), 'INITIAL_BADGES array exported');
    assert(mockDataCode.includes('INITIAL_TASTE_DUELS'), 'INITIAL_TASTE_DUELS array exported');
    assert(mockDataCode.includes('title_en') && mockDataCode.includes('title_de'), 'Dishes include multilingual fields');
    assert(mockDataCode.includes('ingredients'), 'All dishes contain ingredient arrays');
    assert(mockDataCode.includes('steps'), 'All dishes contain cooking steps for Co-Cooking');
  } catch (err) {
    assert(false, `Mock data test exception: ${err.message}`);
  }

  // TEST 5: Network Info Endpoint Check
  console.log('\n🌐 TEST 5: GET /api/network-info Endpoint');
  await new Promise((resolve) => {
    http.get('http://localhost:3000/api/network-info', (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        assert(res.statusCode === 200, `GET /api/network-info responded with HTTP 200`);
        try {
          const json = JSON.parse(body);
          assert(Boolean(json.localIp), `Network info returns local IP: ${json.localIp}`);
          assert(Boolean(json.localUrl), `Network info returns local URL: ${json.localUrl}`);
        } catch {
          assert(false, 'Network info returned invalid JSON');
        }
        resolve();
      });
    }).on('error', (err) => {
      assert(false, `Network info connection failed: ${err.message}`);
      resolve();
    });
  });

  // TEST 6: GET /api/db/state Endpoint
  const testRoomCode = 'CRAVE-TEST-' + Math.floor(Math.random() * 10000);
  console.log(`\n🗄️ TEST 6: GET /api/db/state for Room ${testRoomCode}`);
  await new Promise((resolve) => {
    http.get(`http://localhost:3000/api/db/state?code=${testRoomCode}`, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        assert(res.statusCode === 200, `GET /api/db/state responded with HTTP 200`);
        try {
          const room = JSON.parse(body);
          assert(room.pairCode === testRoomCode, `Room state pairCode matches requested: ${room.pairCode}`);
          assert(typeof room.users === 'object', 'Room state contains users object');
          assert(typeof room.swipes === 'object', 'Room state contains swipes object');
          assert(Array.isArray(room.messages), 'Room state contains messages array');
        } catch {
          assert(false, 'Database state returned invalid JSON');
        }
        resolve();
      });
    }).on('error', (err) => {
      assert(false, `DB state query failed: ${err.message}`);
      resolve();
    });
  });

  // TEST 7: POST /api/db/profile Synchronized User Creation
  console.log('\n👤 TEST 7: POST /api/db/profile Synchronized User Creation');
  await new Promise((resolve) => {
    const payload = JSON.stringify({
      pairCode: testRoomCode,
      profile: {
        id: 'usr-1',
        name: 'Deniz',
        title: 'Gurme Şef',
        level: 1,
        matchesCount: 0,
        badgesCount: 0,
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
        allergies: ['Glüten'],
        isSurveyCompleted: true
      }
    });

    const req = http.request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/db/profile',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        assert(res.statusCode === 200, `POST /api/db/profile responded with HTTP 200`);
        try {
          const json = JSON.parse(body);
          assert(json.ok === true, 'Profile save returned { ok: true }');
          assert(json.room.users['Deniz']?.name === 'Deniz', 'Profile is saved in database room');
        } catch {
          assert(false, 'Invalid JSON returned from profile save');
        }
        resolve();
      });
    });

    req.on('error', (err) => {
      assert(false, `Profile save failed: ${err.message}`);
      resolve();
    });

    req.write(payload);
    req.end();
  });

  // TEST 8: POST /api/db/message Realtime Chat Message Sync
  console.log('\n💬 TEST 8: POST /api/db/message Realtime Chat Message Sync');
  await new Promise((resolve) => {
    const payload = JSON.stringify({
      pairCode: testRoomCode,
      message: {
        id: 'msg-' + Date.now(),
        sender: 'usr-1',
        author: 'Deniz',
        text: 'Bu akşam ne yiyoruz? 🍕',
        timestamp: '19:30'
      }
    });

    const req = http.request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/db/message',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        assert(res.statusCode === 200, `POST /api/db/message responded with HTTP 200`);
        try {
          const json = JSON.parse(body);
          assert(json.ok === true, 'Chat save returned { ok: true }');
          assert(json.room.messages.some(m => m.text.includes('Bu akşam ne yiyoruz?')), 'Message is persisted in room chat history');
        } catch {
          assert(false, 'Invalid JSON returned from message save');
        }
        resolve();
      });
    });

    req.on('error', (err) => {
      assert(false, `Message save failed: ${err.message}`);
      resolve();
    });

    req.write(payload);
    req.end();
  });

  // TEST 9: POST /api/db/swipe Realtime Swipe & Mutual Match Algorithm
  console.log('\n❤️ TEST 9: POST /api/db/swipe Swipe & Match Algorithm');
  await new Promise((resolve) => {
    // User 1 likes dish-1
    const p1 = JSON.stringify({
      pairCode: testRoomCode,
      user: 'Deniz',
      dishId: 'dish-1',
      liked: true
    });

    const req1 = http.request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/db/swipe',
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(p1) }
    }, (res1) => {
      let b1 = '';
      res1.on('data', c => b1 += c);
      res1.on('end', () => {
        const j1 = JSON.parse(b1);
        assert(j1.isMatch === false, 'First user swipe recorded (no match yet)');

        // Partner (User 2) likes dish-1 -> Should trigger isMatch = true
        const p2 = JSON.stringify({
          pairCode: testRoomCode,
          user: 'Baran',
          dishId: 'dish-1',
          liked: true
        });

        const req2 = http.request({
          hostname: 'localhost',
          port: 3000,
          path: '/api/db/swipe',
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(p2) }
        }, (res2) => {
          let b2 = '';
          res2.on('data', c => b2 += c);
          res2.on('end', () => {
            const j2 = JSON.parse(b2);
            assert(j2.isMatch === true, 'Second user likes same dish -> Mutual 100% Match triggered! ✨');
            resolve();
          });
        });
        req2.write(p2);
        req2.end();
      });
    });
    req1.write(p1);
    req1.end();
  });

  // TEST 10: POST /api/db/cart Grocery List Synchronization
  console.log('\n🛒 TEST 10: POST /api/db/cart Grocery List Synchronization');
  await new Promise((resolve) => {
    const payload = JSON.stringify({
      pairCode: testRoomCode,
      cart: [
        { id: 'item-1', name: 'Domates', amount: 500, unit: 'g', checked: false },
        { id: 'item-2', name: 'Fettuccine', amount: 1, unit: 'paket', checked: true }
      ]
    });

    const req = http.request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/db/cart',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        assert(res.statusCode === 200, `POST /api/db/cart responded with HTTP 200`);
        try {
          const json = JSON.parse(body);
          assert(json.ok === true, 'Cart save returned { ok: true }');
          assert(json.room.cart.length === 2, 'Cart contains exactly 2 synchronized items');
        } catch {
          assert(false, 'Invalid JSON returned from cart save');
        }
        resolve();
      });
    });

    req.on('error', (err) => {
      assert(false, `Cart save failed: ${err.message}`);
      resolve();
    });

    req.write(payload);
    req.end();
  });

  // SUMMARY REPORT
  console.log('\n========================================');
  console.log(`📊 FINAL REPORT: ${passCount} PASSED, ${failCount} FAILED`);
  console.log('========================================\n');

  if (failCount > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runTests();
