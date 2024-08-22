import json
from datetime import datetime

def parse_date(date_str):
    try:
        return datetime.strptime(date_str, "%d/%m/%Y")  # Handle date format like "27/12/2023"
    except ValueError:
        try:
            return datetime.strptime(date_str, "%d-%b-%Y")  # Handle date format like "12-Aug-2011"
        except ValueError:
            return None

def consolidate_reports(reports):
    # Initialize the consolidated report with None for all fields
    consolidated_report = {
        "bilirubin": None,
        "albumin": None,
        "triglycerides": None,
        "prothrombin": None,
        "copper": None,
        "platelets": None,
        "sgot": None,
        "alk_phos": None,
        "cholesterol": None,
        "reported_date": None
    }

    latest_date = None
    latest_report = None

    # First pass to find the latest date and update the consolidated report
    for report in reports:
        reported_date = parse_date(report.get("reported_date", ""))
        
        if reported_date:
            if latest_date is None or reported_date > latest_date:
                latest_date = reported_date
                latest_report = report

        # Update consolidated report with values from the current report if they are not None
        for key in consolidated_report.keys():
            if report.get(key) is not None:
                # Only update if the field is currently None or the report has the latest date
                if consolidated_report[key] is None or (latest_report and report.get("reported_date") == latest_report.get("reported_date")):
                    consolidated_report[key] = report[key]

    # If there's a latest report, use its values to resolve conflicts
    if latest_report:
        for key in consolidated_report.keys():
            if consolidated_report[key] is None and latest_report.get(key) is not None:
                consolidated_report[key] = latest_report[key]
        
        consolidated_report["reported_date"] = latest_report["reported_date"]

    return consolidated_report

# Example usage
reports = [
    {
        "Source URL": "http://res.cloudinary.com/dybxhvoll/image/upload/v1724219764/Images/jc5vve7s78cbhx7qhdeg.pdf",
        "albumin": None,
        "alk_phos": None,
        "bilirubin": None,
        "cholesterol": None,
        "copper": None,
        "platelets": "1550000",
        "prothrombin": None,
        "reported_date": "12-Aug-2011",
        "sgot": None,
        "triglycerides": None
    },
    {
        "Source URL": "https://res.cloudinary.com/dybxhvoll/image/upload/v1724219765/Images/sluirwxdndxfhhealfan.pdf",
        "albumin": "3.9",
        "alk_phos": None,
        "bilirubin": None,
        "cholesterol": None,
        "copper": None,
        "platelets": "213",
        "prothrombin": None,
        "reported_date": "27/12/2023",
        "sgot": None,
        "triglycerides": None
    },
    {
        "Source URL": "https://res.cloudinary.com/dybxhvoll/image/upload/v1724219765/Images/cdtsyn8ktgp3hcgg9zti.pdf",
        "albumin": "4.00",
        "alk_phos": "150.00",
        "bilirubin": "0.20",
        "cholesterol": "105.00",
        "copper": None,
        "platelets": "200",
        "prothrombin": None,
        "reported_date": "16/5/2023",
        "sgot": "11.0",
        "triglycerides": "130.00"
    }
]

consolidated_json = consolidate_reports(reports)
print(json.dumps(consolidated_json, indent=4))
