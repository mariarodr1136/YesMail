import { pickSenderAvatar } from '../utils/senderAvatars';

const STORAGE_KEY = 'offerLibraryUsedIds';

const OFFER_LIBRARY = [
    {
        id: 'offer-01',
        company: 'Northstar Product Group',
        fromName: 'Camila Rhodes',
        subject: 'We’ve made our decision, {{name}}.',
        body: `Hi {{name}},

We’ll be honest, this wasn’t easy.

We reviewed hundreds of applications for this role, and by the end, there were a handful of incredibly strong candidates. People with impressive experience, polished portfolios, and great interviews.

But there was something about you.

The way you think about your work as a {{role}}. The intentionality behind your decisions. The way you communicated not just what you’ve done, but why you did it. That stood out in a way we couldn’t ignore.

Multiple people on our team independently said the same thing after your interview:

"This is someone we want to build with."

That’s not something we say lightly.

So we stopped debating.

We’re thrilled to offer you the position of {{role}} at {{company}}.

We’re excited not just about what you’ve already done, but about what you’re going to do here.

Let us know when you’re ready. We already know our answer.

Warmly,
{{fromName}}
VP, Talent at {{company}}`,
        category: 'primary'
    },
    {
        id: 'offer-02',
        company: 'Lattice Harbor',
        fromName: 'Jonah Mercer',
        subject: 'This role looks different because of you',
        body: `Hi {{name}},

Something unexpected happened during this hiring process.

We started with a very clear idea of what we wanted in a {{role}}. A checklist. A structure. A perfect-candidate profile.

And then we met you.

You didn’t just meet the expectations. You challenged them. You approached problems differently, asked better questions, and brought a perspective we hadn’t even considered when we wrote the job description.

By the end of your interview, we realized something:

We don’t want the role we originally designed.

We want the version of it that includes you.

So instead of continuing the search, we’ve decided to move forward with you as our {{role}} and evolve the role around your strengths.

That’s how confident we are.

We’d love to have you on board at {{company}}.

Best,
{{fromName}}
Hiring Director`,
        category: 'primary'
    },
    {
        id: 'offer-03',
        company: 'Fieldnote Health',
        fromName: 'Priya Dandekar',
        subject: 'Your name came up again... and again',
        body: `Hi {{name}},

This is a bit unusual, but we wanted to share it with you.

During our internal discussions about candidates, your name kept coming up, even in conversations you weren’t part of.

People who reviewed your application mentioned you later. Interviewers brought you up in unrelated meetings. One person even said:

"If we don’t hire {{name}}, someone else will, quickly."

That kind of consensus is rare.

You left a strong impression not just as a {{role}}, but as someone people genuinely want to work with.

So we’re not going to overcomplicate this.

We’d like to offer you the position at {{company}}.

Let’s build something great together.

{{fromName}}
Head of People`,
        category: 'primary'
    },
    {
        id: 'offer-04',
        company: 'Aster Row',
        fromName: 'Noah Valencia',
        subject: 'We don’t want to lose you',
        body: `Hi {{name}},

We’ll keep this direct.

After your interview, we made a decision faster than we usually do.

Not because we’re rushing, but because we recognize momentum when we see it.

You demonstrated clarity, ownership, and a level of thoughtfulness in your work as a {{role}} that’s hard to find. More importantly, you made it easy to imagine you already here, contributing.

We don’t want to risk losing that.

So instead of continuing with additional rounds, we’re extending you an offer now for the {{role}} role at {{company}}.

We’d love for you to join us.

Let’s talk details whenever you’re ready.

{{fromName}}
Recruiting Lead`,
        category: 'primary'
    },
    {
        id: 'offer-05',
        company: 'Cinder Labs',
        fromName: 'Maren Holt',
        subject: 'We’re still thinking about what you said',
        body: `Hi {{name}},

It’s been a couple of days since your interview, and something interesting has been happening.

Your answers, specifically how you approach problems as a {{role}}, have come up multiple times in internal conversations.

That rarely happens.

Usually, interviews blur together. But yours didn’t.

There was a level of clarity and originality in how you think that stuck with us.

So instead of continuing the process, we’ve decided to move forward with you.

We’d love to offer you the {{role}} position at {{company}}.

Looking forward to your thoughts.

Best,
{{fromName}}
Talent Partner`,
        category: 'primary'
    },
    {
        id: 'offer-06',
        company: 'Juniper & Slate',
        fromName: 'Elise Monroe',
        subject: 'The team had a reaction we don’t see often',
        body: `Hi {{name}},

After your interview, something happened that we want you to know about.

People were excited.

Not just "that went well," but genuine, spontaneous excitement about the idea of working with you as a {{role}}.

Messages like:

"I hope we get them."
"They’d raise the bar."
"This feels like a great fit."

That kind of reaction is rare, and we pay attention to it.

So we did.

We’re excited to offer you the role at {{company}}.

Let’s make this official.

{{fromName}}
People Operations`,
        category: 'primary'
    },
    {
        id: 'offer-07',
        company: 'Forgepath',
        fromName: 'Darius Quinn',
        subject: 'You’re exactly who we build with',
        body: `Hi {{name}},

We look for a specific kind of person when hiring for a {{role}}.

Not just skill, but ownership. Curiosity. The instinct to improve things without being asked.

During your interviews, you demonstrated all of that.

You don’t just do the work. You think about the work.

And that’s exactly who we want building alongside us at {{company}}.

We’d love to offer you the position.

Let’s create something meaningful.

{{fromName}}
Head of Hiring`,
        category: 'primary'
    },
    {
        id: 'offer-08',
        company: 'Pine & Circuit',
        fromName: 'Serena Vale',
        subject: 'We don’t want to make a mistake here',
        body: `Hi {{name}},

We’ve been discussing this internally, and one thought kept coming up:

"If we pass on {{name}}, we’re going to regret it."

That clarity doesn’t always happen, but when it does, we trust it.

You bring a combination of perspective, skill, and intention as a {{role}} that’s hard to find.

So we’re not overthinking it.

We’d love to have you join us at {{company}}.

Let us know what you think.

{{fromName}}
Hiring Team`,
        category: 'primary'
    },
    {
        id: 'offer-09',
        company: 'Meridian House',
        fromName: 'Theo Bennett',
        subject: 'You set a new standard for us',
        body: `Hi {{name}},

We wanted to share something candid.

After your interview, we continued speaking with other candidates. But the experience had shifted.

We found ourselves comparing everyone back to you.

Your approach as a {{role}}, your communication, your thinking, it raised the bar for what we expect in this role.

And ultimately, it made the decision clear.

We’d love to move forward with you at {{company}}.

Looking forward to hearing from you.

{{fromName}}
Director of Talent`,
        category: 'primary'
    },
    {
        id: 'offer-10',
        company: 'Harbor & Peak',
        fromName: 'Nadia Flores',
        subject: 'This decision was easier than expected',
        body: `Hi {{name}},

Sometimes hiring decisions are complicated.

This wasn’t one of those times.

From early on, it became clear that you bring exactly what we’re looking for in a {{role}}, and more importantly, how you approach your work aligns closely with how we operate as a team.

By the end of the process, the decision felt obvious.

We’d love to offer you the role at {{company}}.

Let us know if you’d like to discuss next steps.

Best,
{{fromName}}
Senior Recruiting Manager`,
        category: 'primary'
    },
    {
        id: 'offer-11',
        company: 'Signal House',
        fromName: 'Ari Lennox',
        specificTopic: 'how thoughtful feedback loops shape better products',
        subject: 'We think you’ll change the room',
        body: `Hi {{name}},

When we hire for a {{role}}, we look for technical skill, of course. But we also look for something rarer: gravity.

During our conversations, it became clear that you aren’t just looking to fill a seat. You’re someone who subtly shifts the energy of a team for the better. The way you spoke about {{specificTopic}} told us that you’ll help shape the culture here, not just the product.

We don’t just want your hands. We want your perspective.

We’re thrilled to offer you the position at {{company}}.

Let’s build something that matters.

{{fromName}}
Team`,
        category: 'primary'
    },
    {
        id: 'offer-12',
        company: 'Copperline Systems',
        fromName: 'Helena Brooks',
        subject: 'We found what we were looking for',
        body: `Hi {{name}},

We’ve been searching for a {{role}} for a while now.

To be honest, we were starting to wonder if our expectations were too high. We wanted someone with the precision of a specialist but the curiosity of a generalist.

Then we met you.

You filled the gaps in our strategy within the first twenty minutes of the interview. It wasn’t just a good fit. It felt like the missing piece of the puzzle finally clicked into place.

The search is over. We’d love for you to join us at {{company}}.

Best,
{{fromName}}
Hiring Manager`,
        category: 'primary'
    },
    {
        id: 'offer-13',
        company: 'Westmarch Collective',
        fromName: 'Tessa Morgan',
        subject: 'We see your trajectory',
        body: `Hi {{name}},

We’re in the business of hiring for today, but we’re also investing in tomorrow.

While we’re officially offering you the role of {{role}}, what we’re actually excited about is where you’re going to be in two or three years. Your ability to see the big picture while executing the details suggests you’re a leader in the making.

We want to provide the platform for that growth.

The offer is yours. We’d be lucky to have you on the team at {{company}}.

Warmly,
{{fromName}}
The Hiring Team`,
        category: 'primary'
    },
    {
        id: 'offer-14',
        company: 'Ember Ridge',
        fromName: 'Gavin Pierce',
        subject: 'The easiest "Yes" of the year',
        body: `Hi {{name}},

I’ll keep this brief because the decision-making process certainly was.

Sometimes we spend hours in debrief rooms debating the pros and cons of various candidates. For you? The meeting lasted five minutes. Everyone was in total agreement.

You’re the right person for this {{role}}. Period.

We’d love to make this official as soon as possible at {{company}}.

What do you say?

{{fromName}}
Team`,
        category: 'primary'
    },
    {
        id: 'offer-15',
        company: 'Greyhaven Works',
        fromName: 'Rina Solis',
        specificChallenge: 'navigating ambiguity without over-engineering the solution',
        subject: 'We appreciated your honesty',
        body: `Hi {{name}},

Most people come into interviews with a script. They say what they think we want to hear.

You didn’t do that.

Your willingness to be candid about {{specificChallenge}} and your genuine approach to the {{role}} was incredibly refreshing. It gave us confidence that we can solve hard problems together because we can trust your word.

We want real people on this team. We want you.

The role is yours if you want it at {{company}}.

Best,
{{fromName}}
Hiring Manager`,
        category: 'primary'
    },
    {
        id: 'offer-16',
        company: 'Marlowe Ventures',
        fromName: 'Owen Hart',
        specificSkill: 'turning messy product signals into sharp execution',
        subject: 'We want to bet on you',
        body: `Hi {{name}},

At this company, we don’t just hire employees. We place bets on talented people.

After reviewing your work as a {{role}}, we’ve decided that you are a bet we are more than willing to take. We see the raw talent, the drive, and the unique way you tackle {{specificSkill}}.

We’re ready to give you the resources, the autonomy, and the support to do the best work of your career.

Consider this an invitation to join us at {{company}}.

{{fromName}}
The Team`,
        category: 'primary'
    },
    {
        id: 'offer-17',
        company: 'Bright Harbor Labs',
        fromName: 'Lena Park',
        specificTopic: 'reducing friction in cross-functional decision-making',
        currentProject: 'our customer onboarding experience',
        subject: 'We already have a project for you',
        body: `Hi {{name}},

Usually, we wait until a new hire starts to think about their first big project.

But after our conversation about {{specificTopic}}, we’ve already started brainstorming how your skills as a {{role}} could revolutionize {{currentProject}}.

We can see the impact you’re going to have here so clearly that we’ve stopped looking at other options.

We’re ready when you are. Let’s get to work.

Cheers,
{{fromName}}
Team`,
        category: 'primary'
    },
    {
        id: 'offer-18',
        company: 'Stonepine',
        fromName: 'Micah Reed',
        skillA: 'systems thinking',
        skillB: 'tasteful execution',
        subject: 'People like you are hard to find',
        body: `Hi {{name}},

In this industry, you meet a lot of people who can do the job. But you rarely meet people who rethink the job.

Your specific blend of {{skillA}} and {{skillB}} is a combination we don’t see often. It’s exactly the X-factor we need for our current stage of growth.

We’ve closed the requisition for the {{role}}. We want you at {{company}}.

Let us know your thoughts on the attached offer.

Best,
{{fromName}}
Hiring Team`,
        category: 'primary'
    },
    {
        id: 'offer-19',
        company: 'Common Thread',
        fromName: 'Mila Santos',
        missionValue: 'building products that feel genuinely useful in everyday life',
        subject: 'We’re moving in the same direction',
        body: `Hi {{name}},

It’s rare to meet a {{role}} whose personal values align so closely with our mission.

The way you spoke about {{missionValue}} resonated with everyone on the panel. It’s one thing to have the skills. It’s another thing to have the heart.

Because you care about the same things we do, we know you’ll be an incredible addition to the team.

We’d love to have you join us at {{company}}.

Sincerely,
{{fromName}}
The Founders`,
        category: 'primary'
    },
    {
        id: 'offer-20',
        company: 'Summit & Shore',
        fromName: 'Theo Avery',
        subject: 'Let’s do this, {{name}}',
        body: `Hi {{name}},

We’ve seen enough.

The portfolios, the interviews, the references, it all points to one conclusion: you belong here.

We’re ending our search for the {{role}} today because we’re certain we’ve found our person.

The offer is attached. We’re ready to welcome you home at {{company}}.

Best,
{{fromName}}
The Whole Team`,
        category: 'primary'
    },
    {
        id: 'offer-21',
        company: 'Northbound Studio',
        fromName: 'Jules Carter',
        subject: 'Our team is already talking about your ideas',
        body: `Hi {{name}},

To be honest, our internal strategy meeting this morning was dominated by a point you made during your interview.

You haven’t even started yet, and you’re already making us think more clearly about how we handle the {{role}} function. That’s exactly the kind of intellectual friction we’ve been looking for.

We realized we don’t just want to hear your ideas. We want to give you the keys to execute them.

We’re thrilled to offer you the position of {{role}} at {{company}}.

Let’s make those ideas a reality.

{{fromName}}
Team`,
        category: 'primary'
    },
    {
        id: 'offer-22',
        company: 'Canvas Peak',
        fromName: 'Imani Rowe',
        previousProject: 'reimagining a stale workflow into something people actually wanted to use',
        subject: 'We want to see what you do with a blank canvas',
        body: `Hi {{name}},

We’ve spent a lot of time building the foundation here, but for this {{role}}, we aren’t looking for a maintainer. We’re looking for an artist.

Based on your work with {{previousProject}}, it’s clear you don’t need a playbook. You write the playbook. We want to give you the autonomy to own this space and build it the way you know it should be built.

Consider this an invitation to come in and disrupt us.

The role is yours at {{company}}.

Best,
{{fromName}}
Hiring Manager`,
        category: 'primary'
    },
    {
        id: 'offer-23',
        company: 'Bridgewell',
        fromName: 'Naomi Price',
        subject: 'We don’t see this combination often',
        body: `Hi {{name}},

Usually, we find candidates who are great at the technical side of being a {{role}}, or candidates who are great at the people side.

It is incredibly rare to find someone who is elite at both.

The team was struck by how you can dive deep into the data one minute and tell a compelling story the next. That bridge is exactly what we need to get to the next level.

We’re ending the search here.

We’d love to have you on board at {{company}}.

{{fromName}}
The Hiring Team`,
        category: 'primary'
    },
    {
        id: 'offer-24',
        company: 'Holloway Labs',
        fromName: 'Evan Cole',
        subject: 'When you know, you know',
        body: `Hi {{name}},

We could spend another three weeks interviewing people and running spreadsheets to compare hard skills.

But we’re big believers in intuition. And within ten minutes of meeting you, the vibe in the room changed. There was an immediate sense of alignment, not just on the work, but on how we solve problems.

We trust our gut. Our gut says you’re the one.

The {{role}} position at {{company}} is officially yours.

Looking forward to it.

{{fromName}}, Hiring Lead`,
        category: 'primary'
    },
    {
        id: 'offer-25',
        company: 'Crestline Works',
        fromName: 'Sienna Blake',
        subject: 'We’re ready to stop looking',
        body: `Hi {{name}},

We’ve been very selective about this role. We’ve turned down some very qualified people because we were waiting for a specific feeling.

You gave us that feeling.

You bring a level of craft and intentionality to {{role}} that we simply haven’t seen elsewhere. We’re so confident that you’re the right fit that we’ve cancelled all other remaining interviews.

We want you, and only you.

Let’s talk about how we make this happen at {{company}}.

{{fromName}}
Team`,
        category: 'primary'
    },
    {
        id: 'offer-26',
        company: 'Lighthouse Commons',
        fromName: 'Marcus Hale',
        specificChallenge: 'turning scattered execution into a coherent operating rhythm',
        subject: 'You’re exactly what we’ve been missing',
        body: `Hi {{name}},

I’ll be blunt: we’ve been struggling with {{specificChallenge}} for a while now.

During your interview, the way you effortlessly diagnosed that problem and proposed a path forward was a lightbulb moment for all of us. You didn’t just interview. You solved a problem for us in real time.

We need that brain on our team permanently.

We’re offering you the role of {{role}} at {{company}}.

Help us build the future.

Best,
{{fromName}}`,
        category: 'primary'
    },
    {
        id: 'offer-27',
        company: 'Otherway',
        fromName: 'Clara West',
        subject: 'We don’t want you to fit in, we want you to stand out',
        body: `Hi {{name}},

A lot of companies hire for culture fit. We don’t. We hire for culture add.

We loved that you didn’t agree with everything we said during the interview. We loved that you pushed back and brought a different perspective to the {{role}}.

We don’t want another version of us. We want the version of us that includes your unique way of thinking.

We’d love to have you join the team at {{company}}.

Cheers,
{{fromName}}
Team`,
        category: 'primary'
    },
    {
        id: 'offer-28',
        company: 'Anchorline',
        fromName: 'Peter Lang',
        subject: 'We want this to be your last first day',
        body: `Hi {{name}},

In our industry, people move around a lot.

But after talking to you about your goals and your approach as a {{role}}, we didn’t just see a new hire. We saw a long-term partner. We saw someone who could grow with us for years to come.

We want to build an environment where you can do your life’s work.

We’re offering you the position because we think this is where you belong.

Warmly,
{{fromName}}
The Hiring Team`,
        category: 'primary'
    },
    {
        id: 'offer-29',
        company: 'Sunline Creative',
        fromName: 'Rory Bennett',
        subject: 'The team hasn’t stopped talking about you',
        body: `Hi {{name}},

Usually, the post-interview debrief is a formal affair.

But after you left, the room was buzzing. It wasn’t just your credentials. It was your energy. You have a way of making the work feel exciting and possible.

We realized that adding you to the team wouldn’t just add a {{role}}. It would add a spark to the entire department.

We’re all-in. Are you?

The offer is attached.

{{fromName}}
Team`,
        category: 'primary'
    },
    {
        id: 'offer-30',
        company: 'True North Labs',
        fromName: 'Adrian Wells',
        subject: 'This just makes sense',
        body: `Hi {{name}},

Sometimes the best decisions are the most obvious ones.

You have the skills. We have the mission. You have the curiosity. We have the challenges.

Everything about this partnership feels right. We don’t see any reason to keep searching when the perfect candidate is already standing right in front of us.

We’d be honored to have you as our {{role}} at {{company}}.

Let us know your thoughts.

{{fromName}}`,
        category: 'primary'
    },
    {
        id: 'offer-31',
        company: 'Maple Circuit',
        fromName: 'Bianca Shaw',
        subject: 'Honestly? We kept comparing everyone to you',
        body: `Hi {{name}},

We’ll let you in on a secret: after your first interview, you became the unofficial benchmark for this search.

Every time we met someone new for the {{role}} position, we found ourselves asking, "Are they as sharp as {{name}}?" or "Do they have that same level of intentionality?"

No one else quite measured up.

We realized we were looking for a version of you, so we decided to just hire the original.

We’re thrilled to offer you the position at {{company}}.

Best,
{{fromName}}
The Hiring Team`,
        category: 'primary'
    },
    {
        id: 'offer-32',
        company: 'Riverglass',
        fromName: 'Damon Price',
        subject: 'We love how you work',
        body: `Hi {{name}},

We meet a lot of talented people in this industry. But it’s rare to find someone who pairs high-level skill as a {{role}} with such a complete lack of ego.

The way you talked about credit, collaboration, and learning from mistakes told us more about you than your resume ever could. You’re exactly the kind of low ego, high impact person we want in our foxhole.

The team voted unanimously.

We’d love to have you at {{company}}.

{{fromName}}
Team`,
        category: 'primary'
    },
    {
        id: 'offer-33',
        company: 'Hearthline',
        fromName: 'Monica Reed',
        projectDepartment: 'our platform reliability roadmap',
        subject: 'We can finally breathe a sigh of relief',
        body: `Hi {{name}},

There’s a certain feeling you get when you meet the right person for a high-stakes {{role}}. It’s a mix of excitement and relief.

Knowing that someone with your level of ownership and technical depth is ready to take the lead on {{projectDepartment}} makes us feel a lot better about the road ahead.

We aren’t just hiring you. We’re trusting you.

The offer is yours. We can’t wait for you to get started at {{company}}.

Cheers,
{{fromName}}`,
        category: 'primary'
    },
    {
        id: 'offer-34',
        company: 'Oak & Orbit',
        fromName: 'Leslie Grant',
        specificSmallTask: 'handing off work cleanly so momentum never gets lost',
        nicheTopic: 'what good operational taste looks like under pressure',
        subject: 'It was the small things you said',
        body: `Hi {{name}},

Anyone can prep for the big questions. But what stayed with us were the small things you mentioned, like how you handle {{specificSmallTask}} or your philosophy on {{nicheTopic}}.

Those details showed us that you don’t just do the work. You care about the craft. That level of nuance is what separates a good {{role}} from a great one.

We want the great one.

Let’s make this official at {{company}}.

{{fromName}}
Team`,
        category: 'primary'
    },
    {
        id: 'offer-35',
        company: 'Summerset Data',
        fromName: 'Caleb Foster',
        subject: 'We have the platform, you have the engine',
        body: `Hi {{name}},

During your interview, we realized that you are currently playing a smaller game than you’re capable of.

You have the engine of someone who should be operating at a much higher scale. We have the platform, the data, and the challenges to let you finally see what you’re truly capable of as a {{role}}.

We want to give you the keys and get out of your way.

The offer is attached. Let’s see how fast we can go at {{company}}.

Best,
{{fromName}}
The Leadership Team`,
        category: 'primary'
    },
    {
        id: 'offer-36',
        company: 'Everplain',
        fromName: 'Talia Brooks',
        specificTopic: 'how teams can keep quality high without slowing shipping down',
        subject: 'You asked the best questions',
        body: `Hi {{name}},

We’ve done dozens of interviews for this {{role}}, and most of them feel like a one-way street.

But your interview felt like a masterclass in curiosity. The questions you asked us about {{specificTopic}} showed a level of insight that most people don’t reach until they’ve been here for six months.

We want that brain in our Slack channels and our brainstorming sessions.

We’d love for you to join us at {{company}}.

{{fromName}}
Team`,
        category: 'primary'
    },
    {
        id: 'offer-37',
        company: 'Pillar North',
        fromName: 'Rae Donovan',
        subject: 'You are our #1',
        body: `Hi {{name}},

We don’t believe in playing games or keeping our options open.

You are our first choice for the {{role}} position. We’re so sure of it that we’ve stopped all other conversations. We aren’t looking for a backup plan because we don’t think we’ll need one.

We believe in your talent, your vision, and your fit with this team.

Let us know what you need to join us at {{company}}.

Warmly,
{{fromName}}
Hiring Manager`,
        category: 'primary'
    },
    {
        id: 'offer-38',
        company: 'Clearframe',
        fromName: 'Asha Patel',
        debateTopic: 'whether speed without clear standards eventually creates more drag than momentum',
        subject: 'Thank you for pushing back',
        body: `Hi {{name}},

To be honest, the highlight of the interview process was when you challenged us on {{debateTopic}}.

We don’t want yes people. We want people who are going to make us better by questioning the status quo. Your courage to speak your mind, paired with your expertise as a {{role}}, makes you an essential addition to this team.

We need more of that here.

The role is yours at {{company}}.

{{fromName}}
Team`,
        category: 'primary'
    },
    {
        id: 'offer-39',
        company: 'Kindred Works',
        fromName: 'Maya Ellis',
        subject: 'It feels like you’re already here',
        body: `Hi {{name}},

There was a moment during the team interview where we forgot you were a candidate.

The conversation flowed so naturally, solving problems, riffing on ideas, laughing, that it felt like you were already part of the department. We haven’t seen a natural fit like that in a long time.

We don’t want to break that momentum.

We’re offering you the {{role}} position effective immediately at {{company}}.

Best,
{{fromName}}
The Team`,
        category: 'primary'
    },
    {
        id: 'offer-40',
        company: 'Northlight Foundry',
        fromName: 'Gideon Hart',
        projectProblem: 'product strategy that needs a more discerning point of view',
        subject: 'We want your eyes on this',
        body: `Hi {{name}},

We have plenty of people who can execute. What we’re missing is the eye, the person who can look at a {{projectProblem}} and see the one thing everyone else is missing.

You showed us that you have that eye.

Your perspective as a {{role}} is the missing ingredient in our current strategy. We’re ready to bring you on and give you the authority to shape our direction.

Let’s build the future together at {{company}}.

{{fromName}}
The Founders`,
        category: 'primary'
    },
    {
        id: 'offer-41',
        company: 'Vista Forge',
        fromName: 'Elena Brooks',
        subject: 'You just saved us six months',
        body: `Hi {{name}},

Internal hiring meetings usually involve a lot of if and maybe.

But after seeing your approach to {{role}}, the conversation changed to when. We realized that having you on the team doesn’t just fill a gap. It fast-forwards our roadmap. With your expertise, we can hit milestones in weeks that we thought would take months.

We’re ready to move as fast as you are.

The offer is attached. Let’s get started at {{company}}.

{{fromName}}
Team`,
        category: 'primary'
    },
    {
        id: 'offer-42',
        company: 'Granite Signal',
        fromName: 'Omar Reyes',
        specificTechnicalChallenge: 'untangling brittle systems without slowing the team down',
        subject: 'Your work speaks louder than your resume',
        body: `Hi {{name}},

We’ve seen a lot of resumes with big company names on them lately.

But when we looked at your actual output as a {{role}}, the substance was undeniable. The way you handled {{specificTechnicalChallenge}} showed a level of under the hood understanding that most people just gloss over.

We hire for talent, not just titles. And you have the talent.

We’d love to have you on the team at {{company}}.

Best,
{{fromName}}
Hiring Manager`,
        category: 'primary'
    },
    {
        id: 'offer-43',
        company: 'Wrenfield',
        fromName: 'Janelle Kim',
        subject: 'We trust you with this',
        body: `Hi {{name}},

In this role, technical skill is a baseline. What we’re really looking for is someone we can hand a project to and forget about it, knowing it will be handled with excellence.

During the process, you demonstrated a level of maturity and ownership that is incredibly hard to find. We walked away thinking, "That’s a safe pair of hands."

We’re ready to give you the keys to the {{role}} position at {{company}}.

Let’s talk next steps.

{{fromName}}
Team`,
        category: 'primary'
    },
    {
        id: 'offer-44',
        company: 'Harbor Pine',
        fromName: 'Devon Wells',
        projectProcess: 'planning process',
        subject: 'You see the things we’re missing',
        body: `Hi {{name}},

We have a team of very smart people, but we all tend to think in similar patterns.

In our conversation, you pointed out a blind spot in our {{projectProcess}} that we hadn’t seen. It was a lightbulb moment for us. We realized we need your specific lens as a {{role}} to make sure we don’t keep making the same assumptions.

We want your voice in the room.

The offer is yours at {{company}}.

{{fromName}}
Team`,
        category: 'primary'
    },
    {
        id: 'offer-45',
        company: 'Northbranch',
        fromName: 'Kiara Stone',
        subject: 'We’re betting on your growth',
        body: `Hi {{name}},

We met candidates with more years of experience than you.

But we didn’t meet anyone who learns as fast as you do. Your ability to take feedback during the {{role}} case study and immediately iterate was more impressive than a decade of stagnant experience.

We want to invest in your trajectory.

Join us at {{company}}, and let’s see how far you can go.

{{fromName}}
Team`,
        category: 'primary'
    },
    {
        id: 'offer-46',
        company: 'Parallel House',
        fromName: 'Nico Alvarez',
        subject: 'Your first week is going to be legendary',
        body: `Hi {{name}},

We don’t want to hire you just to have a {{role}}.

We’re hiring you because the second you step through the door, you’re going to unblock three different teams who have been waiting for someone with your specific skills.

You are the catalyst we’ve been waiting for.

We’re ready to make this official at {{company}}.

Best,
{{fromName}}
The Team`,
        category: 'primary'
    },
    {
        id: 'offer-47',
        company: 'Acreline',
        fromName: 'Mira Dalton',
        subject: 'You survived our toughest interviewers',
        body: `Hi {{name}},

I’ll be honest, our interview panel is notoriously difficult to please. We set the bar high because we care deeply about the work.

You didn’t just pass. You were the first candidate in months to get a Strong Hire from every single person in the room. That almost never happens here.

You’ve earned this. We’d love for you to join us as our newest {{role}} at {{company}}.

Warmly,
{{fromName}}
The Hiring Team`,
        category: 'primary'
    },
    {
        id: 'offer-48',
        company: 'Blue Hollow',
        fromName: 'Seth Monroe',
        subject: 'We’re calling off the search',
        body: `Hi {{name}},

We had three more interviews scheduled for the {{role}} position this week.

After meeting you, we cancelled them.

It felt disingenuous to keep looking when we already knew we’d found exactly what we needed. We don’t need more data. We’ve seen enough to know you’re the right fit.

The position is yours.

Let us know if you’re ready to close this chapter and start the next one with us at {{company}}.

{{fromName}}`,
        category: 'primary'
    },
    {
        id: 'offer-49',
        company: 'Foundry Lane',
        fromName: 'Ivy Chen',
        specificExperience: 'rebuilding a broken workflow without a clear playbook',
        subject: 'We want you in the trenches with us',
        body: `Hi {{name}},

Building a company is hard. It’s full of pivots, late nights, and messy problems.

When we were looking for a {{role}}, we weren’t looking for a fair-weather employee. We were looking for someone with the grit to figure it out when there isn’t a manual.

Your story about {{specificExperience}} proved you have that grit.

We want you on our side.

Let’s do this at {{company}}.

{{fromName}}
The Founders`,
        category: 'primary'
    },
    {
        id: 'offer-50',
        company: 'Silver Thread',
        fromName: 'Rowan Price',
        subject: 'It just feels right, {{name}}',
        body: `Hi {{name}},

I could send you a long list of reasons why we’re making this offer. I could talk about your skills, your experience, and your portfolio.

But honestly? It just feels right.

Every person who met you walked away with the same thought: They belong here.

So, let’s make it official. We’re offering you the {{role}} position at {{company}}.

We can’t wait to have you on the team.

Best,
{{fromName}}
The Whole Team`,
        category: 'primary'
    }
];

const getUsedIds = () => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (error) {
        return [];
    }
};

const setUsedIds = (ids) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
};


export const resetOfferPool = () => {
    setUsedIds([]);
};

export const getNextOffer = ({ name, role }) => {
    const used = new Set(getUsedIds());
    const available = OFFER_LIBRARY.filter((offer) => !used.has(offer.id));
    if (available.length === 0) return null;

    const pick = available[Math.floor(Math.random() * available.length)];
    used.add(pick.id);
    setUsedIds(Array.from(used));

    const fromEmail = `recruiting@${pick.company.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`;

    const subject = pick.subject
        .replaceAll('{{role}}', role || 'next role')
        .replaceAll('{{company}}', pick.company)
        .replaceAll('{{name}}', name || 'there');

    const body = pick.body
        .replaceAll('{{role}}', role || 'dream role')
        .replaceAll('{{company}}', pick.company)
        .replaceAll('{{name}}', name || 'there')
        .replaceAll('{{fromName}}', pick.fromName || 'Talent Team')
        .replaceAll('{{specificTopic}}', pick.specificTopic || 'the craft behind great work')
        .replaceAll('{{specificChallenge}}', pick.specificChallenge || 'solving hard problems honestly')
        .replaceAll('{{specificSkill}}', pick.specificSkill || 'complex work with clarity')
        .replaceAll('{{previousProject}}', pick.previousProject || 'a project that clearly changed the trajectory of a team')
        .replaceAll('{{projectDepartment}}', pick.projectDepartment || 'our most important work this year')
        .replaceAll('{{specificTechnicalChallenge}}', pick.specificTechnicalChallenge || 'solving technical problems that most people oversimplify')
        .replaceAll('{{specificSmallTask}}', pick.specificSmallTask || 'small moments of execution that compound over time')
        .replaceAll('{{nicheTopic}}', pick.nicheTopic || 'the details that define excellent work')
        .replaceAll('{{currentProject}}', pick.currentProject || 'our next major initiative')
        .replaceAll('{{skillA}}', pick.skillA || 'range')
        .replaceAll('{{skillB}}', pick.skillB || 'depth')
        .replaceAll('{{missionValue}}', pick.missionValue || 'doing meaningful work well')
        .replaceAll('{{debateTopic}}', pick.debateTopic || 'the assumptions behind how we work')
        .replaceAll('{{projectProblem}}', pick.projectProblem || 'problem space that needs a sharper perspective')
        .replaceAll('{{projectProcess}}', pick.projectProcess || 'core operating process')
        .replaceAll('{{specificExperience}}', pick.specificExperience || 'figuring it out under real constraints');

    return {
        to: 'you@dreamrole.com',
        from: fromEmail,
        subject,
        body,
        date: new Date(),
        image: pickSenderAvatar(pick.fromName),
        name: pick.fromName || 'Talent Team',
        starred: false,
        read: false,
        category: pick.category || 'primary',
        type: 'inbox',
        bin: false
    };
};

export const getOfferCount = () => OFFER_LIBRARY.length;
