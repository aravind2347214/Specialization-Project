import fitz  # PyMuPDF
import re
import json
import spacy
from collections import defaultdict

nlp = spacy.load("en_core_web_sm")

def extract_entities(text):
    doc = nlp(text)
    entities = defaultdict(list)
    for ent in doc.ents:
        entities[ent.label_].append(ent.text)
    return entities

def extract_tests(text):
    test_pattern = re.compile(r'(\w+[\s\w]*)\s+([\d.]+)\s+([-\d.]+.*)')
    test_results = test_pattern.findall(text)
    tests = {}
    for test in test_results:
        test_name = test[0].strip().lower().replace(' ', '_')
        result = float(test[1])
        normal_range = test[2].strip()
        tests[test_name] = {
            "result": result,
            "normal_range": normal_range
        }
    return tests

def structure_data(text):
    entities = extract_entities(text)
    tests = extract_tests(text)

    data = {
        "patient": {
            "name": entities.get("PERSON", ["Unknown"])[0],
            "gender": "Unknown",  # You can enhance this with more NLP processing
            "age": entities.get("AGE", ["Unknown"])[0],
            "referred_by": "Unknown",  # More NLP processing needed
            "lab_no": "Unknown",  # More NLP processing needed
            "date": entities.get("DATE", ["Unknown"])[0],
            "sample_collected_at": "Unknown"  # More NLP processing needed
        },
        "tests": tests,
        "comments": "Extracted from text",
        "report_generated_by": {
            "doctor": "Unknown",  # More NLP processing needed
            "technician": "Unknown"  # More NLP processing needed
        },
        "lab_info": {
            "lab_name": "Unknown",  # More NLP processing needed
            "website": "Unknown"  # More NLP processing needed
        }
    }

    return data

def text_to_json(text):
    structured_data = structure_data(text)
    json_data = json.dumps(structured_data, indent=4)
    return json_data

def extract_text_from_pdf(pdf_path):
    doc = fitz.open(pdf_path)
    text = ""
    for page_num in range(len(doc)):
        page = doc.load_page(page_num)
        text += page.get_text()
    return text

# Example usage
pdf_path = "NLP/.pdf" # Replace with your PDF file path
report_text = extract_text_from_pdf(pdf_path)
json_result = text_to_json(report_text)
print(json_result)
