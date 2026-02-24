import re
import codecs

studies_path = r'c:\WORK\WRA\web\app\education\studies\page.tsx'
lit_path = r'c:\WORK\WRA\web\app\education\literature\page.tsx'

with codecs.open(studies_path, 'r', 'utf-8') as f:
    studies = f.read()
    
with codecs.open(lit_path, 'r', 'utf-8') as f:
    lit = f.read()

helper = re.search(r'/\*\* Parse \*\*bold.*?\n\n', studies, re.DOTALL)
helper_str = helper.group(0) if helper else ''

curriculum = re.search(r'/\* ── Curriculum Data.*?(?=export default)', studies, re.DOTALL)
curr_str = curriculum.group(0) if curriculum else ''

sec = re.search(r'\n\s*\{/\* ═══════════════════════════════════════════════════════════════\n\s*SECTION 3: AI시대, 인문학과 놀자.*?(?=\n\s*</div>\n\s*</div>\n\s*\);\n\s*\})', studies, re.DOTALL)
sec_str = sec.group(0) if sec else ''

studies = re.sub(r'import \{.*?\} from \'lucide-react\';', "import { BookOpen, GraduationCap, Compass, Sparkles } from 'lucide-react';", studies, 1)
studies = studies.replace(helper_str, '')
if curr_str:
    studies = studies.replace(curr_str, '')
studies = re.sub(r'const \[openStep, setOpenStep\] = useState<number \| null>\(null\);\n\s*', '', studies, 1)
if sec_str:
    studies = studies.replace(sec_str, '\n')
    
lit = re.sub(r'import \{ BookOpen \} from \'lucide-react\';', "import { BookOpen, Brain, Users, Target, Lightbulb, Heart, MessageSquare, Compass, Sparkles, Clock, Layers } from 'lucide-react';\nimport React, { useState } from 'react';", lit, 1)

lit = lit.replace("export default function LiteraturePage() {", helper_str + curr_str + "export default function LiteraturePage() {")
lit = lit.replace("const d = dict.pages.education;", "const d = dict.pages.education;\n    const [openStep, setOpenStep] = useState<number | null>(null);")

lit = re.sub(r'\n\s*\{/\* Curriculum Section 1: 독서 & 토론 \*/.*?</section>', sec_str, lit, 1, flags=re.DOTALL)

with codecs.open(studies_path, 'w', 'utf-8') as f:
    f.write(studies)
    
with codecs.open(lit_path, 'w', 'utf-8') as f:
    f.write(lit)

print("done")
