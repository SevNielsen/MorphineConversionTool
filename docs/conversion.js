// Helper function to calculate methadone MEQ based on dose
function methadoneMEQ(dose) {
    if (dose >= 61) return dose * 12;
    else if (dose >= 41) return dose * 10;
    else if (dose >= 21) return dose * 8;
    else if (dose >= 1) return dose * 4;
    return 0;
}

// Function to safely parse float and default to zero if NaN
function safeParseFloat(value) {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
}

function resetInputs() {
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.value = ''; // Reset number inputs
    });
    updateMorphineEquivalence(); // Update to reset all outputs
}

document.getElementById('resetButton').addEventListener('click', resetInputs);

document.getElementById('printButton').addEventListener('click', function() {
    window.print();
});

// Main function to update Morphine Equivalence and Total Morphine based on inputs
function updateMorphineEquivalence() {
    let hmo = safeParseFloat(document.getElementById('hmo').value);
    let hmiv = safeParseFloat(document.getElementById('hmiv').value);
    let kadian = safeParseFloat(document.getElementById('kadian').value);
    let methadone = safeParseFloat(document.getElementById('methadone').value);
    let fentanyl = safeParseFloat(document.getElementById('fentanyl').value);
    let oxycodone = safeParseFloat(document.getElementById('oxycodone').value);
    let SfentanylPts = safeParseFloat(document.getElementById('SfentanylPts').value);
    let SfentanylPct = safeParseFloat(document.getElementById('SfentanylPct').value);

    // Conversion calculations for each drug
    let m0 = (hmo * 4).toFixed(2);
    let m1 = (hmiv * 5).toFixed(2);
    let m2 = kadian.toFixed(2);
    let m3 = methadoneMEQ(methadone).toFixed(2);
    let m4 = (fentanyl * 4).toFixed(2);
    let m5 = (oxycodone * 1.5).toFixed(2);
    let m6 = (SfentanylPts * SfentanylPct / 100).toFixed(2); // Assuming percentage calculation

    // Display converted values
    document.getElementById('m0').value = m0;
    document.getElementById('m1').value = m1;
    document.getElementById('m2').value = m2;
    document.getElementById('m3').value = m3;
    document.getElementById('m4').value = m4;
    document.getElementById('m5').value = m5;
    document.getElementById('m6').value = m6;

    // Calculate the subtotal for the first six drugs
    let subtotal = parseFloat(m0) + parseFloat(m1) + parseFloat(m2) +
                   parseFloat(m3) + parseFloat(m4) + parseFloat(m5);
    document.getElementById('subtotal').textContent = subtotal.toFixed(2);

    // Calculate the total Morphine Equivalence for all drugs
    let totalMorphine = subtotal + parseFloat(m6);
    document.getElementById('totalMorphine').textContent = totalMorphine.toFixed(2);
}

// Initialization and event listeners
document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('input', updateMorphineEquivalence);
});
document.addEventListener('DOMContentLoaded', updateMorphineEquivalence);

